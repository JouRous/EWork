using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abstractions.Entities;
using Abstractions.ViewModels;
using AutoMapper;
using Infrastructure.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace Api.Controllers
{
  public class ListItemController : BaseController
  {
    private readonly IMongoRepository<List> _listRepository;
    private readonly IMongoRepository<Ticket> _ticketRepository;
    private readonly IMapper _mapper;

    public ListItemController(IMongoRepository<List> listRepository, IMongoRepository<Ticket> ticketRepository, IMapper mapper)
    {
      _listRepository = listRepository;
      _ticketRepository = ticketRepository;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
      var lists = await _listRepository.AsQueryable().ToListAsync();

      return Ok(_mapper.Map<ICollection<ListItemGetResult>>(lists));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetById(Guid id)
    {
      var list = await _listRepository.FindByIdAsync(id);

      return Ok(_mapper.Map<ListItemGetResult>(list));
    }

    [HttpPost]
    public async Task<ActionResult> CreateList(CreateListParams createListParams)
    {
      var list = _mapper.Map<List>(createListParams);

      await _listRepository.InsertOneAsync(list);

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(Guid id, CreateListParams createListParams)
    {
      var list = await _listRepository.FindByIdAsync(id);
      list.Name = createListParams.ListName;

      await _listRepository.ReplaceOneAsync(list);

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
      await _listRepository.DeleteOneAsync(x => x.Id == id);
      await _ticketRepository.DeleteManyAsync(x => x.ListId == id);
      // await _ticketRepository.DeleteTicketWithList(id);

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

  }
}