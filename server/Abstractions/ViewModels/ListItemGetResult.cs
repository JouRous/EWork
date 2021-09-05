using System;
using System.Collections.Generic;
using Abstractions.Entities;

namespace Abstractions.ViewModels
{
  public class ListItemGetResult : BaseGetResult
  {
    public string ListName { get; set; }
    public Guid BoardId { get; set; }
    public ICollection<Ticket> ListTickets { get; set; }
  }
}