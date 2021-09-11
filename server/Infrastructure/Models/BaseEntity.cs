using System;

namespace Infrastructure.Models
{
  public class BaseEntity
  {
    // [BsonId]
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
    public DateTime? DeletedAt { get; set; } = null;
  }
}