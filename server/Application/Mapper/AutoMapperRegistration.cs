using Microsoft.Extensions.DependencyInjection;

namespace Application.Mapper
{
  public static class AutoMapperRegistration
  {
    public static IServiceCollection AddMapper(this IServiceCollection services)
    {
      services.AddAutoMapper(
          typeof(UserMapperProfile).Assembly,
          typeof(ProjectMapperProfile).Assembly,
          typeof(BoardMapperProfile).Assembly
      );

      return services;
    }
  }
}