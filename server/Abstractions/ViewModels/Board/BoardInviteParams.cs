using System;
using System.Collections.Generic;

namespace Abstractions.ViewModels
{
  public class BoardInviteParams
  {
    public IList<Guid> UserIds { get; set; }
  }
}