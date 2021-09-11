using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abstractions.Entities;
using Infrastructure.Data.Interfaces;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace Api.Middleware
{
  public class JwtMiddleware
  {
    private readonly RequestDelegate _next;
    private readonly IConfiguration _config;
    private readonly ILogger<JwtMiddleware> _logger;

    public JwtMiddleware(RequestDelegate next, IConfiguration config, ILogger<JwtMiddleware> logger)
    {
      _next = next;
      _config = config;
      _logger = logger;
    }

    public async Task Invoke(HttpContext context, IRepository<User> repository)
    {
      var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

      if (token != null)
      {
        await attachUserToContext(context, repository, token);
      }

      await _next(context);
    }

    public async Task attachUserToContext(HttpContext context, IRepository<User> repository, string token)
    {
      try
      {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_config.GetValue<string>("Secret"));

        tokenHandler.ValidateToken(token, new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(key),
          ValidateIssuer = false,
          ValidateAudience = false,
          ClockSkew = TimeSpan.Zero
        }, out SecurityToken validatedToken);

        var jwtToken = (JwtSecurityToken)validatedToken;
        var userId = jwtToken.Claims.First(x => x.Type == "UserId").Value;
        var user = new User();
        try
        {
          user = await repository.FirstOrDefaultAsync(new Guid(userId));
        }
        catch (Exception ex)
        {
          _logger.LogError(ex.Message);
          context.Response.StatusCode = StatusCodes.Status500InternalServerError;
          await context.Response.WriteAsJsonAsync(new
          {
            statusCode = 500,
            message = "Internal server error"
          });
        };

        context.Items["User"] = user;
      }
      catch (Exception ex)
      {
        _logger.LogError(ex.Message);
      }
    }
  }
}