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
    private readonly IMapper _mapper;

    public SearchController(IRepository<User> userRepository, IMapper mapper)
    {
      _userRepository = userRepository;
      _mapper = mapper;
    }

    [HttpGet("user")]
    public async Task<ActionResult> SearchUser([FromQuery] UserSearchQuery queryParams)
    {
      var query = _userRepository.Query();

      if (!string.IsNullOrEmpty(queryParams.Email))
      {
        query = query.Where(u => u.Email.Contains(queryParams.Email));
      }
      else
      {
        return Ok(new List<User>());
      }

      var userFound = await query.ProjectTo<UserDetailDto>(_mapper.ConfigurationProvider)
        .ToListAsync();

      return Ok(userFound);
    }
  }
}