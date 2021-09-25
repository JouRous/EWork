using System;
using System.Collections.Generic;

namespace Abstractions.ViewModels
{
  public class BoardGetResult : BaseGetResult
  {
    public string Title { get; set; }
    public IList<UserGetResult> Members { get; set; }
    public IList<ListGetResult> Lists { get; set; }
  }
}