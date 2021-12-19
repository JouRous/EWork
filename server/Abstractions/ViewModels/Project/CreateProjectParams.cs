using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Abstractions.ViewModels
{
  public class CreateProjectParams
  {
    public string Name { get; set; }
    public string ShortDescription { get; set; }
    // public string Wiki { get; set; }
  }
}