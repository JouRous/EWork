using System;
using Infrastructure.Models;

namespace Abstractions.Entities
{
  public class Comment : BaseEntity
  {
    public string Content { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
    public Guid TicketId { get; set; }
    public Ticket Ticket { get; set; }
  }
}