using System;

namespace Abstractions.ViewModels
{
  public class TicketGetResult : BaseGetResult
  {
    public string Name { get; set; }
    public string Pos { get; set; }
    public Guid ListId { get; set; }
  }
}