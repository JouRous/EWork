using System;
using System.Collections.Generic;

namespace Abstractions.ViewModels
{
  public class CreateTicketParams
  {
    public string TicketName { get; set; }
    public string Content { get; set; }
    public int Pos { get; set; }
    public Guid ListId { get; set; }
    public ICollection<Guid> MemberIds { get; set; } = new List<Guid>();
  }
}