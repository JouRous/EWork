using System.Threading.Tasks;
using Abstractions.Exceptions;
using Microsoft.AspNetCore.Http;

namespace Api.Middleware
{
  public class ErrorHandler
  {
    private readonly RequestDelegate _next;

    public ErrorHandler(RequestDelegate next)
    {
      _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
      try
      {
        await _next(context);
      }
      catch (HttpException ex)
      {
        var response = new
        {
          StatusCode = ex.StatusCode,
          Message = ex.Message
        };
        context.Response.StatusCode = ex.StatusCode;
        await context.Response.WriteAsJsonAsync(response);
      }
    }
  }
}