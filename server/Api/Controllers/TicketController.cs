using System;
using System.Threading.Tasks;
using Abstractions.Entities;
using Abstractions.ViewModels;
using AutoMapper;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
  public class TicketController : BaseController
  {
    private readonly IRepository<Ticket> _ticketRepository;
    private readonly IRepository<List> _listRepository;
    private readonly IMapper _mapper;

    public TicketController(
        IRepository<Ticket> ticketRepository,
        IRepository<List> listRepository,
        IMapper mapper
    )
    {
      _ticketRepository = ticketRepository;
      _listRepository = listRepository;
      _mapper = mapper;
    }

    [HttpGet("id")]
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
  }
}