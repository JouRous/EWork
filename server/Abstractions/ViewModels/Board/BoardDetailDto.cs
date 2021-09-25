using System.Collections.Generic;

namespace Abstractions.ViewModels
{
  public class BoardDetailDto : BaseGetResult
  {
    public string Title { get; set; }
    public IList<UserGetResult> Members { get; set; }
    public IList<ListGetResultWithTicket> Lists { get; set; }
  }
}