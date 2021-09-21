using System.Collections.Generic;

namespace Abstractions.ViewModels
{
  public class BoardDetailDto : BaseGetResult
  {
    public string Name { get; set; }
    public IList<UserGetResult> Members { get; set; }
    public IList<ListGetResultWithTicket> Lists { get; set; }
  }
}