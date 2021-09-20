using System.Collections.Generic;

namespace Abstractions.ViewModels
{
  public class ListGetResultWithTicket : ListGetResult
  {
    public IList<TicketGetResult> Tickets { get; set; }
  }
}