using Abstractions.Entities;
using AutoMapper;
using Infrastructure.Repositories;

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

  }
}