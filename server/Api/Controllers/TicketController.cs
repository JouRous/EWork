using System;
using System.Threading.Tasks;
using Abstractions.Entities;
using Abstractions.ViewModels;
using AutoMapper;
using Infrastructure.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Api.Controllers
{
  public class TicketController : BaseController
  {
    private readonly IIRepository<Ticket> _ticketRepository;
    private readonly IIRepository<ListItem> _listRepository;
    private readonly IMapper _mapper;

    public TicketController(
        IIRepository<Ticket> ticketRepository,
        IIRepository<ListItem> listRepository,
        IMapper mapper
    )
    {
      _ticketRepository = ticketRepository;
      _listRepository = listRepository;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
      return Ok(await _ticketRepository.AsQueryable().ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetById(Guid id)
    {
      var ticket = await _ticketRepository.FindByIdAsync(id);

      return Ok(ticket);
    }

    [HttpPost]
    public async Task<ActionResult> Create(CreateTicketParams createTicketParams)
    {
      var ticket = _mapper.Map<Ticket>(createTicketParams);
      ticket.Id = Guid.NewGuid();

      await _ticketRepository.InsertOneAsync(ticket);

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(Guid id, CreateTicketParams createTicketParams)
    {
      var ticket = _mapper.Map<Ticket>(createTicketParams);
      ticket.Id = id;

      await _ticketRepository.ReplaceOneAsync(ticket);

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
      await _ticketRepository.DeleteOneAsync(x => x.Id == id);

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

    [HttpPost("{id}/move")]
    public async Task<ActionResult> MoveCard(Guid id, MoveTicketParams moveTicketParams)
    {
      var topPos = moveTicketParams.TopPos;
      var botPos = moveTicketParams.BotPos;
      var newPos = -1;

      if (topPos == 0)
      {
        newPos = botPos / 2;
      }

      if (botPos == 0)
      {
        newPos = newPos + 65535;
      }

      if (topPos != 0 && botPos != 0)
      {
        newPos = (topPos + botPos) / 2;
      }

      var updateDefinition = Builders<Ticket>
        .Update
          .Set(t => t.ListId, moveTicketParams.ListId)
          .Set(t => t.Pos, newPos);

      await _ticketRepository.UpdateOneAsync(x => x.Id == id, updateDefinition);

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

  }
}