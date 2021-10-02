using System;
using System.Collections.Generic;
using Abstractions.Entities;

namespace Abstractions.ViewModels
{
  public class TicketGetResult : BaseGetResult
  {
    public string Title { get; set; }
    public string Description { get; set; }
    public string Pos { get; set; }
    public Guid ListId { get; set; }
    public ICollection<Comment> Comments { get; set; }
  }
}