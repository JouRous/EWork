using System;
using System.Linq;
using System.Threading.Tasks;
using Abstractions.Entities;
using Abstractions.ViewModels;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
  public class BoardController : BaseController
  {
    private readonly IRepository<Board> _boardRepository;
    private readonly IMapper _mapper;

    public BoardController(
      IRepository<Board> boardRepository,
      IMapper mapper)
    {
      _boardRepository = boardRepository;
      _mapper = mapper;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetById(Guid id)
    {
      var board = await _boardRepository.Query(board => board.Id == id)
        .Include(b => b.Lists)
        .ProjectTo<BoardGetResult>(_mapper.ConfigurationProvider)
        .FirstOrDefaultAsync();
      board.Lists = board.Lists.OrderBy(l => l.Pos).ToList();
      return Ok(board);
    }

    [HttpGet("{id}/tickets")]
    public async Task<ActionResult> GetTicketsInBoard(Guid id)
    {
      var tickets = await _boardRepository.Query(b => b.Id == id)
        .Include(b => b.Lists.OrderByDescending(l => l.Pos))
        .ThenInclude(l => l.Tickets)
        .Select(x => x.Lists.Select(l => l.Tickets))
        .ToListAsync();

      return Ok(tickets);
    }

    [HttpPost]
    public async Task<ActionResult> Create(CreateBoardParams createBoardParams)
    {
      var board = _mapper.Map<Board>(createBoardParams);
      _boardRepository.Add(board);
      await _boardRepository.SaveChangesAsync();

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(Guid id, UpdateBoardParams updateBoardParams)
    {
      var boardToUpdate = await _boardRepository.FirstOrDefaultAsync(id);
      boardToUpdate.Name = updateBoardParams.Name;

      await _boardRepository.SaveChangesAsync();

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
      var boardToDelete = await _boardRepository.FirstOrDefaultAsync(id);
      _boardRepository.Remove(boardToDelete);
      await _boardRepository.SaveChangesAsync();

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }
  }
}