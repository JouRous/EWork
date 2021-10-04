using System;
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

    /// <summary>Create comment</summary>
    [HttpPost]
    public async Task<ActionResult> Create(CreateCommentParams createCommentParams)
    {
      var comment = _mapper.Map<Comment>(createCommentParams);

      _commentRepository.Add(comment);
      await _commentRepository.SaveChangesAsync();

      return Ok(comment);
    }

    /// <summary>Update comment</summary>
    [HttpPut("{id}")]
    public async Task<ActionResult> Update(Guid id, UpdateCommentParams body)
    {
      var comment = await _commentRepository.FirstOrDefaultAsync(id);
      comment.Content = body.Content;
      comment.CreatedAt = DateTime.Now;
      await _commentRepository.SaveChangesAsync();

      return Ok(comment);
    }

    /// <summary>Delete comment</summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
      var comment = await _commentRepository.FirstOrDefaultAsync(id);
      _commentRepository.Remove(comment);
      await _commentRepository.SaveChangesAsync();

      return Ok();
    }
  }
}