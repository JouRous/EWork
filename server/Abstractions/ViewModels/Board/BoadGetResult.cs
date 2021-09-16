using System;
using System.Collections.Generic;

namespace Abstractions.ViewModels
{
  public class BoardGetResult : BaseGetResult
  {
    public string Name { get; set; }
    public IList<ListGetResult> Lists { get; set; }
  }
}