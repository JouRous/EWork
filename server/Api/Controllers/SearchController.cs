using System.Collections.Generic;
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
  public class SearchController : BaseController
  {
    private readonly IRepository<User> _userRepository;
    private readonly IRepository<Board> _boardRepository;
    private readonly IMapper _mapper;

    public SearchController(IRepository<User> userRepository, IRepository<Board> boardRepository, IMapper mapper)
    {
      _userRepository = userRepository;
      _boardRepository = boardRepository;
      _mapper = mapper;
    }

    [HttpGet("user")]
    public async Task<ActionResult> SearchUser([FromQuery] UserSearchQuery queryParams)
    {
      var query = _userRepository.Query();

      if (!string.IsNullOrEmpty(queryParams.Email))
      {
        query = query.Where(u => u.Email.ToLower().Contains(queryParams.Email.ToLower()));
      }
      else
      {
        return Ok(new List<User>());
      }

      var userFound = await query.ProjectTo<UserDetailDto>(_mapper.ConfigurationProvider)
        .ToListAsync();

      return Ok(userFound);
    }

    [HttpGet("board")]
    public async Task<ActionResult> SearchBoard([FromQuery] BoardSearchParams searchParams)
    {
      var query = _boardRepository.Query().Where(b => b.IsPublic == true);

      if (!string.IsNullOrEmpty(searchParams.Title))
      {
        query = query.Where(b => b.Title.ToLower().Contains(searchParams.Title.ToLower()));
      }
      else
      {
        return Ok(new List<Board>());
      }

      var boardFound = await query.ProjectTo<BoardDetailDto>(_mapper.ConfigurationProvider).ToListAsync();

      return Ok(boardFound);
    }
  }
}