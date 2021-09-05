using System.Collections.Generic;
using Abstractions.Entities;

namespace Abstractions.ViewModels
{
  public class ProjectGetResult : BaseGetResult
  {
    public string Name { get; set; }
    public string ImageUrl { get; set; }
    public ICollection<UserGetResult> Users { get; set; }
    public List<Board> Boards { get; set; }
  }
}