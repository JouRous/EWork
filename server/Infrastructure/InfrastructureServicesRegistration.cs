using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
  public static class InfrastructureServicesRegistration
  {
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration config)
    {

      return services;
    }
  }
}