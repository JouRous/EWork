using System.Collections.Generic;

namespace Abstractions.ViewModels
{
  public class ListGetResult : BaseGetResult
  {
    public string Name { get; set; }
    public IList<TicketGetResult> Tickets { get; set; }
  }
}