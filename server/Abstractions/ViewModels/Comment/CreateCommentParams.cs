using System;

namespace Abstractions.ViewModels
{
  public class CreateCommentParams
  {
    public string Content { get; set; }
    public Guid UserId { get; set; }
    public Guid TicketId { get; set; }
  }
}