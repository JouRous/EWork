using System;
using System.Threading.Tasks;
using Abstractions.Entities;
using Abstractions.ViewModels;
using AutoMapper;
using Infrastructure.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Api.Controllers
{
  public class BoardController : BaseController
  {
    private readonly IIRepository<Board> _boardRepository;
    private readonly IIRepository<ListItem> _listRepository;
    private readonly IMapper _mapper;
    private readonly IIRepository<Ticket> _ticketRepository;

    public BoardController(
      IIRepository<Board> boardRepository,
      IIRepository<ListItem> listRepository,
      IIRepository<Ticket> ticketRepository,
      IMapper mapper)
    {
      _boardRepository = boardRepository;
      _listRepository = listRepository;
      _ticketRepository = ticketRepository;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
      return Ok(await _boardRepository.AsQueryable().ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetById(Guid id)
    {
      var board = await _boardRepository.FindByIdAsync(id);

      return Ok(board);
    }

    [HttpPost]
    public async Task<ActionResult> Create(CreateBoardParams createBoardParams)
    {
      var board = _mapper.Map<Board>(createBoardParams);
      await _boardRepository.InsertOneAsync(board);

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(Guid id, UpdateBoardParams updateBoardParams)
    {
      var board = _mapper.Map<Board>(updateBoardParams);
      board.Id = id;

      await _boardRepository.ReplaceOneAsync(board);

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
      await _boardRepository.DeleteByIdAsync(id);

      var listItemIds = _listRepository.AsQueryable()
                .Where(l => l.BoardId == id)
                .Select(x => x.Id)
                .ToList();

      foreach (var listItemId in listItemIds)
      {
        await _ticketRepository.DeleteManyAsync(
            x => x.ListId == listItemId
        );
      }

      await _listRepository.DeleteManyAsync(
          x => x.BoardId == id
      );
      // await _listRepository.DeleteListWithBoard(id);

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }
  }
}