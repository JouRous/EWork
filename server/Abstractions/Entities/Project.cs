using System;
using System.Collections.Generic;
using Infrastructure.Models;

namespace Abstractions.Entities
{
  // [BsonCollection("Projects")]
  public class Project : BaseEntity
  {
    public string Name { get; set; }
    public string ShortDescription { get; set; }
    // public string Wiki {get; set;}
    public Guid Creator { get; set; }
    public ICollection<Board> Boards { get; set; } = new List<Board>();
    public ICollection<UserProject> UserProjects { get; set; } = new List<UserProject>();
  }
}