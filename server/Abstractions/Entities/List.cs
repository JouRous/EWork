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
    public double Pos { get; set; }
    public Guid BoardId { get; set; }
    public IList<Ticket> Tickets { get; set; } = new List<Ticket>();
  }
}