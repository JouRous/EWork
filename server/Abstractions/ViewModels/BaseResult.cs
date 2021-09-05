using System;

namespace Abstractions.ViewModels
{
  public class BaseGetResult
  {
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
  }
}