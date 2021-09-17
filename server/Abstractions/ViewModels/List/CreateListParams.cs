using System;

namespace Abstractions.ViewModels
{
  public class CreateListParams
  {
    public string Name { get; set; }
    public string Pos { get; set; }
    public Guid BoardId { get; set; }
  }
}