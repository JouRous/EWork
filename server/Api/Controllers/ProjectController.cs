using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abstractions.Entities;
using Abstractions.Exceptions;
using Abstractions.ViewModels;
using Api.Middleware;
using Application.Services.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace Api.Controllers
{
  [AuthorizeAttribute]
  [ApiVersion("1.0")]
  public class ProjectController : BaseController
  {
    private readonly IRepository<Project> _projectRepository;
    private readonly IRepository<Board> _boardRepository;
    private readonly ICloudinaryService _cloudinaryService;
    private readonly IMapper _mapper;
    public ProjectController(
        IRepository<Project> projectRepository,
        IRepository<Board> boardRepository,
        ICloudinaryService cloudinaryService,
        IMapper mapper)
    {
      _projectRepository = projectRepository;
      _boardRepository = boardRepository;
      _cloudinaryService = cloudinaryService;
      _mapper = mapper;
    }

    private User GetUserFromContext()
    {
      return (User)HttpContext.Items["User"];
    }

    /// <summary>Get projects</summary>
    [HttpGet, MapToApiVersion("1.0")]
    public async Task<ActionResult> GetAll()
    {
      var user = GetUserFromContext();

      var projects = await _projectRepository
        .Query(p => p.Creator == user.Id)
        .Include(p => p.UserProjects)
        .Include(p => p.Boards)
        .ToListAsync();

      return Ok(_mapper.Map<IList<ProjectGetResult>>(projects));
    }


    /// <summary>Get guest project</summary>
    [HttpGet("guest")]
    public async Task<ActionResult> GetGuestProject()
    {
      var user = GetUserFromContext();

      var projects = await _projectRepository.Query()
        .Include(x => x.UserProjects)
        .Where(p => p.Creator != user.Id)
        .Where(p => p.UserProjects.Any(x => x.UserId == user.Id))
        .ProjectTo<ProjectGetResult>(_mapper.ConfigurationProvider)
        .ToListAsync();

      return Ok(projects);
    }

    ///<summary>Get project by Id</summary>
    [HttpGet("{id}")]
    public async Task<ActionResult> GetById(Guid id)
    {
      var project = await _projectRepository.Query().Include(p => p.Boards).FirstOrDefaultAsync(p => p.Id == id);
      return Ok(project);
    }

    [HttpGet("{id}/members")]
    public async Task<ActionResult> GetMembers(Guid id)
    {
      var members = await _projectRepository.Query(x => x.Id == id)
        .Include(x => x.UserProjects)
        .ThenInclude(x => x.User)
        .Select(x => x.UserProjects.Select(x => x.User))
        .FirstOrDefaultAsync();

      return Ok(_mapper.Map<List<UserDetailDto>>(members));
    }

    /// <summary>Get Wiki</summary>
    [HttpGet("{id}/wiki")]
    public async Task<ActionResult> GetWiki(Guid id)
    {
      var project = await _projectRepository.FirstOrDefaultAsync(id);
      return Ok(project.Wiki);
    }

    /// <summary>Get boards by project id</summary>
    [HttpGet("{id}/boards")]
    public async Task<ActionResult> GetBoardByProjectId(Guid id)
    {
      var user = GetUserFromContext();

      var users = await _projectRepository.Query(x => x.Id == id)
        .Include(p => p.UserProjects)
        .Select(p => p.UserProjects)
        .FirstOrDefaultAsync();

      var checkExist = users.Any(x => x.UserId == user.Id);

      if (!checkExist)
      {
        throw new HttpException(403, "Access Denied");
      }

      var boards = await _projectRepository.Query(p => p.Id == id)
        .Include(p => p.Boards)
        .Select(p => p.Boards)
        .FirstOrDefaultAsync();

      // return Ok(_mapper.Map<IList<BoardGetResult>>(project.Boards));
      return Ok(boards);
    }

    /// <summary>Create project</summary>
    [HttpPost]
    public async Task<ActionResult> CreateProject(CreateProjectParams createProjectParams)
    {
      var user = (User)HttpContext.Items["User"];
      var project = _mapper.Map<Project>(createProjectParams);

      project.Creator = user.Id;

      project.UserProjects.Add(new UserProject
      {
        UserId = user.Id
      });

      // if (createProjectParams.ImageUrl != null)
      // {
      //   var result = await _cloudinaryService.UploadImageAsync(createProjectParams.ImageUrl);
      //   // project.ImageId = result.PublicId;
      //   project.ImageUrl = result.SecureUrl.AbsoluteUri;
      // }

      var tran = _projectRepository.BeginTransaction();

      try
      {
        _projectRepository.Add(project);
        await _projectRepository.SaveChangesAsync();

        await tran.CommitAsync();
      }
      catch (System.Exception)
      {
        await tran.RollbackAsync();
        return BadRequest();
      }

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

    /// <summary>Invite user to project</summary>
    [HttpPost("{id}/invite")]
    public async Task<ActionResult> Invite(Guid id, InviteToProjectParmas inviteToProjectParmas)
    {
      var currentUser = GetUserFromContext();
      var userIds = inviteToProjectParmas.UserIds;

      var project = await _projectRepository.Query()
        .Where(p => p.Creator == currentUser.Id)
        .FirstOrDefaultAsync(p => p.Id == id);

      if (project == null)
      {
        throw new BadRequestException();
      }

      foreach (var userId in userIds)
      {
        project.UserProjects.Add(new UserProject
        {
          UserId = userId
        });
      }

      var tran = _projectRepository.BeginTransaction();

      try
      {
        await _projectRepository.SaveChangesAsync();
        await tran.CommitAsync();
      }
      catch (System.Exception)
      {
        await tran.RollbackAsync();
        return BadRequest();
      }

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

    /// <summary>Delete project</summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProject(Guid id)
    {
      var projectToDelete = await _projectRepository.FirstOrDefaultAsync(id);

      _projectRepository.Remove(projectToDelete);
      await _projectRepository.SaveChangesAsync();

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

  }
}