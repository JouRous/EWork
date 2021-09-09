using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abstractions.Entities;
using Abstractions.ViewModels;
using Api.Middleware;
using Application.Services.Interfaces;
using AutoMapper;
using Infrastructure.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Api.Controllers
{
  [AuthorizeAttribute]
  public class ProjectController : BaseController
  {
    private readonly IMongoRepository<Project> _projectRepository;
    private readonly IMongoRepository<Board> _boardRepository;
    private readonly IMongoRepository<ListItem> _listRepository;
    private readonly IMongoRepository<Ticket> _ticketRepository;
    private readonly ICloudinaryService _cloudinaryService;
    private readonly IMapper _mapper;
    public ProjectController(
        IMongoRepository<Project> projectRepository,
        IMongoRepository<Board> boardRepository,
        IMongoRepository<ListItem> listRepository,
        IMongoRepository<Ticket> ticketRepository,
        ICloudinaryService cloudinaryService,
        IMapper mapper)
    {
      _projectRepository = projectRepository;
      _boardRepository = boardRepository;
      _listRepository = listRepository;
      _ticketRepository = ticketRepository;
      _cloudinaryService = cloudinaryService;
      _mapper = mapper;

    }

    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
      var user = (User)HttpContext.Items["User"];

      var projects = await _projectRepository.AsQueryable().ToListAsync();
      return Ok(_mapper.Map<IEnumerable<ProjectGetResult>>(projects));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetById(Guid id)
    {
      var project = await _projectRepository.FindOneAsync(p => p.Id == id);
      return Ok(project);
    }

    [HttpGet("{id}/boards")]
    public async Task<ActionResult> GetBoardByProjectId(Guid id)
    {
      var projects = await _projectRepository.AsAggregate()
        .Lookup("Boards", "_id", "ProjectId", "ListBoards")
        .As<ProjectGetResult>()
        .ToListAsync();

      return Ok(projects);
    }

    [HttpPost]
    public async Task<ActionResult> CreateProject([FromForm] CreateProjectParams createProjectParams)
    {
      var project = _mapper.Map<Project>(createProjectParams);

      if (createProjectParams.ImageUrl != null)
      {
        var result = await _cloudinaryService.UploadImageAsync(createProjectParams.ImageUrl);
        // project.ImageId = result.PublicId;
        project.ImageUrl = result.SecureUrl.AbsoluteUri;
      }

      await _projectRepository.InsertOneAsync(project);

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProject(Guid id)
    {
      await _projectRepository.DeleteByIdAsync(id);

      var boardIds = await _boardRepository.AsQueryable()
                .Where(x => x.ProjectId == id)
                .Select(x => x.Id)
                .ToListAsync();

      await _boardRepository.DeleteManyAsync(x => x.ProjectId == id);

      foreach (var boardId in boardIds)
      {
        var listItemIds = await _listRepository.AsQueryable()
          .Where(l => l.BoardId == boardId)
          .Select(x => x.Id)
          .ToListAsync();

        foreach (var listItemId in listItemIds)
        {
          await _ticketRepository.DeleteManyAsync(
              x => x.ListId == listItemId
          );
        }

        await _listRepository.DeleteManyAsync(
            x => x.BoardId == boardId
        );
      }
      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }
  }
}