using System;
using System.Collections.Generic;
using Infrastructure.Helpers;
using Infrastructure.Models;

namespace Abstractions.Entities
{
  [BsonCollection("Boards")]
  public class Board : BaseEntity
  {
    public string BoardName { get; set; }
    public Guid ProjectId { get; set; }
    public List<ListItem> ListItems { get; set; }
  }
}