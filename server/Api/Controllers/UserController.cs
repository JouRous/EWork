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
  public class UserController : BaseController
  {
    private IRepository<User> _userRepository;
    private IMapper _mapper;

    public UserController(IRepository<User> userRepository, IMapper mapper)
    {
      _userRepository = userRepository;
      _mapper = mapper;
    }

    [HttpGet("profile")]
    public async Task<ActionResult> GetProfile()
    {
      var user = (User)HttpContext.Items["User"];

      if (user == null)
      {
        return Unauthorized();
      }

      var profile = await _userRepository.Query(x => x.Id == user.Id)
        .ProjectTo<UserDetailDto>(_mapper.ConfigurationProvider)
        .FirstOrDefaultAsync();
      return Ok(profile);
    }
  }
}