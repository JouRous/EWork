using System;
using System.Collections.Generic;
using Abstractions.Entities;

namespace Abstractions.ViewModels
{
  public class ListGetResult : BaseGetResult
  {
    public string Name { get; set; }
    public string Pos { get; set; }
    public Guid BoardId { get; set; }
  }
}