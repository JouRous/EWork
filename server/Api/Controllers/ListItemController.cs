using System;
using System.Threading.Tasks;
using Abstractions.Entities;
using Abstractions.ViewModels;
using AutoMapper;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

    [HttpGet]
    public async Task<ActionResult> GetList()
    {
      var lists = await _listRepository.Query().ToListAsync();

      return Ok(lists);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetById(Guid id)
    {
      var list = await _listRepository.Query(l => l.Id == id)
        .Include(l => l.Tickets)
        .FirstOrDefaultAsync();

      return Ok(list);
    }

    [HttpPost]
    public async Task<ActionResult> Create(CreateListParams createListParams)
    {
      var list = _mapper.Map<List>(createListParams);

      _listRepository.Add(list);
      await _listRepository.SaveChangesAsync();

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }
  }
}