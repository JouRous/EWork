using System.Collections.Generic;
using Infrastructure.Helpers;
using Infrastructure.Models;

namespace Abstractions.Entities
{
  // [BsonCollection("Users")]
  public class User : BaseEntity
  {
    public string Email { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public ICollection<UserProject> UserProjects { get; set; } = new List<UserProject>();
    public IList<UserBoard> UserBoards { get; set; } = new List<UserBoard>();
  }
}