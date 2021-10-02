using System;
using System.Collections.Generic;

namespace Abstractions.ViewModels
{
  public class CreateTicketParams
  {
    public string Title { get; set; }
    public string Description { get; set; } = "";
    public string Pos { get; set; }
    public Guid ListId { get; set; }
    public ICollection<Guid> MemberIds { get; set; } = new List<Guid>();
  }
}