using System;
using System.Net;

namespace Abstractions.Exceptions
{
  public class NotFoundException : HttpException
  {
    public NotFoundException(string message = "Not Found") : base(message)
    {
      this.StatusCode = (int)HttpStatusCode.NotFound;
    }
  }
}