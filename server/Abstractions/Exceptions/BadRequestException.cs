using System.Net;

namespace Abstractions.Exceptions
{
  public class BadRequestException : HttpException
  {
    public BadRequestException(string message = "Bad request") : base(message)
    {
      StatusCode = (int)HttpStatusCode.BadRequest;
    }
  }
}