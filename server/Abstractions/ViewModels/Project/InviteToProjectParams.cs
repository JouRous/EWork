using System;
using System.Collections.Generic;

namespace Abstractions.ViewModels
{
  public class InviteToProjectParmas
  {
    public ICollection<Guid> UserIds { get; set; }
  }
}