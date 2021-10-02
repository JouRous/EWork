using System.Threading.Tasks;
using Abstractions.Entities;
using Abstractions.ViewModels;
using AutoMapper;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
  public class CommentController : BaseController
  {
    private readonly IRepository<Comment> _commentRepository;
    private readonly IMapper _mapper;
    public CommentController(
      IRepository<Comment> commentRepository,
      IMapper mapper
    )
    {
      _commentRepository = commentRepository;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
      return Ok(await _commentRepository.Query().ToListAsync());
    }

    [HttpPost]
    public async Task<ActionResult> Create(CreateCommentParams createCommentParams)
    {
      var comment = _mapper.Map<Comment>(createCommentParams);

      _commentRepository.Add(comment);
      await _commentRepository.SaveChangesAsync();

      return Ok();
    }

  }
}