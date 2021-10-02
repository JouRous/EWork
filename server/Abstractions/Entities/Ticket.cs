using System;
using System.Collections.Generic;
using Infrastructure.Models;

namespace Abstractions.Entities
{
  // [BsonCollection("Tickets")]
  public class Ticket : BaseEntity
  {
    public string Title { get; set; }
    public string Description { get; set; }
    public string Pos { get; set; }
    public Guid ListId { get; set; }
    public List List { get; set; }
    public ICollection<Comment> Comments { get; set; }
  }
}