using Api.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Extensions
{
  public static class ServiceCollectionExtensions
  {
    public static IServiceCollection AddApiServices(this IServiceCollection services, IConfiguration configuration)
    {
      var connString = configuration.GetConnectionString("Postgresql");
      services.AddDbContext<AppDbContext>(options =>
      {
        options.UseNpgsql(connString);
      });

      services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

      return services;
    }
  }
}