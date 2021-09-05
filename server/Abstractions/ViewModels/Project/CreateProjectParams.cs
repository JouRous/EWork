using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Abstractions.ViewModels
{
  public class CreateProjectParams
  {
    public string Title { get; set; }
    public string ShortDescription { get; set; }
    public ICollection<Guid> UserIds { get; set; }
    public IFormFile ImageUrl { get; set; }
  }
}