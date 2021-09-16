using System;

namespace Abstractions.ViewModels
{
  public class CreateListParams
  {
    public string Name { get; set; }
    public double Pos { get; set; }
    public Guid BoardId { get; set; }
  }
}