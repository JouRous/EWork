using System;

namespace Abstractions.ViewModels
{
  public class CreateListParams
  {
    public string ListName { get; set; }
    public Guid BoardId { get; set; }
  }
}