using System;
using System.Collections.Generic;
using Infrastructure.Helpers;
using Infrastructure.Models;

namespace Abstractions.Entities
{
  // [BsonCollection("Lists")]
  public class List : BaseEntity
  {
    public string Title { get; set; }
    public string Pos { get; set; }
    public Guid BoardId { get; set; }
    public Board Board { get; set; }
    public IList<Ticket> Tickets { get; set; } = new List<Ticket>();
  }
}