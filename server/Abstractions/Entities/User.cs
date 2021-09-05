using Infrastructure.Helpers;
using Infrastructure.Models;

namespace Abstractions.Entities
{
  [BsonCollection("Users")]
  public class User : BaseEntity
  {
    public string Email { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
  }
}