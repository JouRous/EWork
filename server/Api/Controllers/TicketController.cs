using System;
using System.Threading.Tasks;
using Abstractions.Entities;
using Abstractions.ViewModels;
using Api.Hubs;
using AutoMapper;
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

    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
      return Ok(await _ticketRepository.Query().ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> Get(Guid id)
    {
      var ticket = await _ticketRepository.FirstOrDefaultAsync(id);
      return Ok(ticket);
    }

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

    [HttpPost("{id}/move")]
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
  }
}