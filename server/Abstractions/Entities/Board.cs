using System;
using System.Collections.Generic;
using Infrastructure.Helpers;
using Infrastructure.Models;

namespace Abstractions.Entities
{
  // [BsonCollection("Boards")]
  public class Board : BaseEntity
  {
    public string Name { get; set; }
    public Guid ProjectId { get; set; }
    public Project Project { get; set; }
    public IList<List> Lists { get; set; }
  }
}