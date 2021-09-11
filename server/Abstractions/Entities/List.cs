using System;
using System.Collections.Generic;
using Infrastructure.Helpers;
using Infrastructure.Models;

namespace Abstractions.Entities
{
  // [BsonCollection("Lists")]
  public class List : BaseEntity
  {
    public string Name { get; set; }
    public Guid BoardId { get; set; }
    public List<Ticket> ListTickets { get; set; } = new List<Ticket>();
  }
}