using System;
using System.Threading.Tasks;
using Abstractions.Entities;
using Api.Middleware;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers.v2
{
  [Route("api/v{version:apiVersion}/board")]
  [AuthorizeAttribute]
  [ApiVersion("2.0")]
  public class BoardV2Controller : BaseController
  {
    private readonly IRepository<Board> _boardRepository;
    public BoardV2Controller(
      IRepository<Board> boardRepository
    )
    {
      _boardRepository = boardRepository;
    }

    [HttpGet("id")]
    public async Task<ActionResult> Get(Guid id)
    {
      var board = await _boardRepository.Query(b => b.Id == id)
        .Include(b => b.Lists)
        .FirstOrDefaultAsync();

      return Ok(board);
    }
  }
}