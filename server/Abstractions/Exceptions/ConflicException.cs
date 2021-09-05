using System;
using System.Net;

namespace Abstractions.Exceptions
{
  public class ConflictException : HttpException
  {
    public ConflictException(string message = "Conflict") : base(message)
    {
      StatusCode = (int)HttpStatusCode.Conflict;
    }
  }
}