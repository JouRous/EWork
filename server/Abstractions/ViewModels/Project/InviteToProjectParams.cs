using System;
using System.Collections.Generic;

namespace Abstractions.ViewModels
{
  public class InviteToProjectParmas
  {
    public Guid ProjectId { get; set; }
    public ICollection<Guid> UserIds { get; set; }
  }
}