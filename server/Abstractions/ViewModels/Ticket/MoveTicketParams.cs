using System;

namespace Abstractions.ViewModels
{
  public class MoveTicketParams
  {
    public string Pos { get; set; }
    public Guid ListId { get; set; }
    public Guid BoardId { get; set; }
  }
}