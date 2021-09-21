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

    [HttpGet, MapToApiVersion("1.0")]
    public async Task<ActionResult> GetAll()
    {
      var user = GetUserFromContext();

      var projects = await _projectRepository
        .Query(p => p.Creator == user.Id)
        .Include(p => p.Boards)
        .ToListAsync();

      return Ok(_mapper.Map<IList<ProjectGetResult>>(projects));
    }

    [HttpGet("guest")]
    public async Task<ActionResult> GetGuestProject()
    {
      var user = GetUserFromContext();

      var projects = await _projectRepository.Query()
        .Include(p => p.Boards)
        .ThenInclude(b => b.UserBoards.Where(x => x.UserId == user.Id))
        .Where(p => p.Creator != user.Id)
        .ToListAsync();

      return Ok(projects);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetById(Guid id)
    {
      var project = await _projectRepository.Query().Include(p => p.Boards).FirstOrDefaultAsync(p => p.Id == id);
      return Ok(project);
    }

    [HttpGet("{id}/boards")]
    public async Task<ActionResult> GetBoardByProjectId(Guid id)
    {
      var user = GetUserFromContext();

      var project = await _projectRepository.Query(p => p.Id == id)
        .Include(b => b.Boards)
        .ThenInclude(b => b.UserBoards)
        .FirstOrDefaultAsync();

      if (!(project.Creator == user.Id))
      {
        project.Boards = project.Boards.Where(b => b.UserBoards.Any(x => x.UserId == user.Id)).ToList();
      }

      return Ok(_mapper.Map<IList<BoardGetResult>>(project.Boards));
    }

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

    [HttpPost("invite")]
    public async Task<ActionResult> Invite(InviteToProjectParmas inviteToProjectParmas)
    {
      var currentUser = GetUserFromContext();
      var projectId = inviteToProjectParmas.ProjectId;
      var userIds = inviteToProjectParmas.UserIds;

      var project = await _projectRepository.Query()
        .Where(p => p.Creator == currentUser.Id)
        .FirstOrDefaultAsync(p => p.Id == projectId);

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