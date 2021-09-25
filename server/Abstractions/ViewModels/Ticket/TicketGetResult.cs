using System;

namespace Abstractions.ViewModels
{
  public class TicketGetResult : BaseGetResult
  {
    public string Title { get; set; }
    public string Pos { get; set; }
    public Guid ListId { get; set; }
  }
}