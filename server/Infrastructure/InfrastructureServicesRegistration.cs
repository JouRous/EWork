using Infrastructure.Data.Interfaces;
using Infrastructure.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
  public static class InfrastructureServicesRegistration
  {
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration config)
    {
      services.AddScoped(typeof(IIRepository<>), typeof(Repository<>));

      return services;
    }
  }
}