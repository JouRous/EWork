using System;
using System.Threading.Tasks;
using Abstractions.Entities;
using Abstractions.ViewModels;
using Api.Hubs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
  public class TicketController : BaseController
  {
    private readonly IRepository<Ticket> _ticketRepository;
    private readonly IRepository<List> _listRepository;
    private readonly IHubContext<MoveActionHub> _moveActionHub;
    private readonly IMapper _mapper;

    public TicketController(
        IRepository<Ticket> ticketRepository,
        IRepository<List> listRepository,
        IHubContext<MoveActionHub> moveActionHub,
        IMapper mapper
    )
    {
      _ticketRepository = ticketRepository;
      _listRepository = listRepository;
      _moveActionHub = moveActionHub;
      _mapper = mapper;
    }

    /// <summary>Get tickets</summary>
    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
      return Ok(await _ticketRepository.Query().ToListAsync());
    }

    /// <summary>Get ticket by id</summary>
    [HttpGet("{id}")]
    public async Task<ActionResult> Get(Guid id)
    {
      var ticket = await _ticketRepository.Query(t => t.Id == id)
        .Include(t => t.Comments)
        .ProjectTo<TicketGetResult>(_mapper.ConfigurationProvider)
        .FirstOrDefaultAsync();
      return Ok(ticket);
    }

    /// <summary>Create ticket</summary>
    [HttpPost]
    public async Task<ActionResult> Create(CreateTicketParams createTicketParams)
    {
      var ticket = _mapper.Map<Ticket>(createTicketParams);

      _ticketRepository.Add(ticket);
      await _ticketRepository.SaveChangesAsync();

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

    /// <summary>Move ticket (Update pos)</summary>
    [HttpPost("{id}/pos")]
    public async Task<ActionResult> UpdatePos(Guid id, MoveTicketParams moveTicketParams)
    {
      var ticket = await _ticketRepository.FirstOrDefaultAsync(id);
      ticket.Pos = moveTicketParams.Pos;

      if (moveTicketParams.ListId != Guid.Empty)
      {
        ticket.ListId = moveTicketParams.ListId;
      }

      await _ticketRepository.SaveChangesAsync();

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

    /// <summary>Update title of ticket</summary>
    [HttpPatch("{id}/title")]
    public async Task<ActionResult> UpdateTitle(Guid id, UpdateTicketParams body)
    {
      var ticket = await _ticketRepository.FirstOrDefaultAsync(id);
      ticket.Title = body.Title;
      await _listRepository.SaveChangesAsync();

      return Ok(ticket);
    }

    /// <summary>Update description of ticket</summary>
    [HttpPatch("{id}/description")]
    public async Task<ActionResult> UpdateDescription(Guid id, UpdateTicketParams body)
    {
      var ticket = await _ticketRepository.FirstOrDefaultAsync(id);
      ticket.Description = body.Description;
      await _listRepository.SaveChangesAsync();

      return Ok(ticket);
    }
  }
}