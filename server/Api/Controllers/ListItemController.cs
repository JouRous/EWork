using Abstractions.Entities;
using AutoMapper;
using Infrastructure.Repositories;

namespace Api.Controllers
{
  public class ListItemController : BaseController
  {
    private readonly IRepository<List> _listRepository;
    private readonly IRepository<Ticket> _ticketRepository;
    private readonly IMapper _mapper;

    public ListItemController(IRepository<List> listRepository, IRepository<Ticket> ticketRepository, IMapper mapper)
    {
      _listRepository = listRepository;
      _ticketRepository = ticketRepository;
      _mapper = mapper;
    }

  }
}