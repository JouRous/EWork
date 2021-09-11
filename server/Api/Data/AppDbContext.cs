using Abstractions.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<UserProject>().HasKey(src => new { src.UserId, src.ProjectId });
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<UserProject> UserProjects { get; set; }
    public DbSet<Board> Boards { get; set; }
  }
}