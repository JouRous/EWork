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
    private readonly IRepository<Ticket> _ticketRepository;
    private readonly IRepository<List> _listRepository;
    private readonly IMapper _mapper;

    public BoardController(
      IRepository<Board> boardRepository,
      IRepository<Ticket> ticketRepository,
      IRepository<List> listRepository,
      IMapper mapper)
    {
      _boardRepository = boardRepository;
      _ticketRepository = ticketRepository;
      _listRepository = listRepository;
      _mapper = mapper;
    }

    ///<summary>Get board by id</summary>
    [HttpGet("{id}")]
    public async Task<ActionResult> GetById(Guid id)
    {
      var user = (User)HttpContext.Items["User"];

      var board = await _boardRepository.Query(board => board.Id == id)
        .Include(b => b.Lists.OrderBy(x => x.Pos))
        .ThenInclude(l => l.Tickets.OrderBy(x => x.Pos))
        .Include(b => b.Project)
        .ThenInclude(p => p.UserProjects)
        .ThenInclude(x => x.User)
        .ProjectTo<BoardDetailDto>(_mapper.ConfigurationProvider)
        .FirstOrDefaultAsync();

      board.Lists = board.Lists.OrderBy(l => l.Pos).ToList();
      foreach (var list in board.Lists)
      {
        list.Tickets = list.Tickets.OrderBy(x => x.Pos).ToList();
      }
      return Ok(board);
    }

    ///<summary>Get tickets in board</summary>
    [HttpGet("{id}/tickets")]
    public async Task<ActionResult> GetTicketsInBoard(Guid id)
    {
      var tickets = await _ticketRepository.Query()
        .Include(t => t.List)
        .ThenInclude(l => l.Board)
        .Where(x => x.List.BoardId == id)
        .ProjectTo<TicketGetResult>(_mapper.ConfigurationProvider)
        .AsSplitQuery()
        .ToListAsync();

      return Ok(tickets);
    }

    ///<summary>Get lists in board</summary>
    [HttpGet("{id}/lists")]
    public async Task<ActionResult> GetListItems(Guid id)
    {
      var lists = await _listRepository.Query(x => x.BoardId == id)
        .Include(l => l.Tickets.OrderBy(t => t.Pos))
        .OrderBy(l => l.Pos)
        .ProjectTo<ListGetResultWithTicket>(_mapper.ConfigurationProvider)
        .ToListAsync();

      foreach (var list in lists)
      {
        list.Tickets = list.Tickets.OrderBy(x => x.Pos).ToList();
      }

      return Ok(lists);
    }

    ///<summary>Create board</summary>
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

    ///<summary>Update board</summary>
    [HttpPut("{id}")]
    public async Task<ActionResult> Update(Guid id, UpdateBoardParams updateBoardParams)
    {
      var boardToUpdate = await _boardRepository.FirstOrDefaultAsync(id);
      boardToUpdate.Title = updateBoardParams.Title;

      await _boardRepository.SaveChangesAsync();

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

    ///<summary>Delete board</summary>
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