using Application.Mapper;
using Application.Models;
using Application.Services;
using Application.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
  public static class ApplicationServicesRegistration
  {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
      services.AddScoped<ITokenService, TokenService>();
      services.AddScoped<IEmailService, EmailService>();
      services.AddScoped<ICloudinaryService, CloudinaryService>();

      services.Configure<CloudinarySettings>(configuration.GetSection("CloudinarySettings"));

      services.AddMapper();

      return services;
    }
  }
}