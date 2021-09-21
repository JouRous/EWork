using System;
using System.Linq;
using System.Threading.Tasks;
using Abstractions.Entities;
using Abstractions.ViewModels;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Api.Hubs
{
  public class MoveActionHub : Hub
  {
    private readonly IRepository<Board> _boardRepository;
    private readonly IRepository<List> _listRepository;
    private readonly IMapper _mapper;
    public MoveActionHub(IRepository<List> listRepository, IRepository<Board> boardRepository, IMapper mapper)
    {
      _listRepository = listRepository;
      _boardRepository = boardRepository;
      _mapper = mapper;
    }

    public async Task InitConnection(string boardId)
    {
      await Groups.AddToGroupAsync(Context.ConnectionId, boardId);
      await Clients.Group(boardId).SendAsync("InitConnection", $"{Context.ConnectionId} has connect to ${boardId}");
    }

    public async Task MoveTicket(string boardId)
    {
      Console.WriteLine("Move Ticket");
      var board = await _boardRepository.Query(board => board.Id == new Guid(boardId))
        .Include(b => b.Lists)
        .ThenInclude(l => l.Tickets)
        .ProjectTo<BoardDetailDto>(_mapper.ConfigurationProvider)
        .FirstOrDefaultAsync();

      board.Lists = board.Lists.OrderBy(l => l.Pos).ToList();
      foreach (var list in board.Lists)
      {
        list.Tickets = list.Tickets.OrderBy(x => x.Pos).ToList();
      }

      await Clients.OthersInGroup(boardId).SendAsync("TicketHasMoved", board);
    }
  }
}