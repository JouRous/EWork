using System;
using System.Text.Json.Serialization;
using Infrastructure.Helpers;
using Infrastructure.Models;

namespace Abstractions.Entities
{
  [BsonCollection("Tickets")]
  public class Ticket : BaseEntity
  {
    public string TicketName { get; set; }
    public string Content { get; set; }
    public int Pos { get; set; }
    public Guid ListId { get; set; }
  }
}