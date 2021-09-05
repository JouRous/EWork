using System;
using System.Collections.Generic;
using Infrastructure.Helpers;
using Infrastructure.Models;

namespace Abstractions.Entities
{
  [BsonCollection("Projects")]
  public class Project : BaseEntity
  {
    public string Name { get; set; }
    public string ImageUrl { get; set; }
    // public string ImageId { get; set; }

    public List<Board> Boards { get; set; }
    public ICollection<User> Users { get; set; }
    public ICollection<Guid> UserIds { get; set; }
  }
}