using System;

namespace Abstractions.ViewModels
{
  public class MoveTicketParams
  {
    public Guid ListId { get; set; }
    public int TopPos { get; set; }
    public int BotPos { get; set; }
  }
}