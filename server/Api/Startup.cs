using Api.Extensions;
using Api.Middleware;
using Application;
using Infrastructure;
using Infrastructure.Models;
using Infrastructure.Swagger;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Api
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }
    // private readonly string _policyName = "CorsPolicy";

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddCors();

      services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

      services.AddApiVersioning(config =>
      {
        config.DefaultApiVersion = new ApiVersion(1, 0);
        config.UseApiBehavior = false;
        config.AssumeDefaultVersionWhenUnspecified = true;
        config.ReportApiVersions = true;
      });
      // services.AddApiVersioning();

      services.AddApiServices(Configuration);

      services.AddApplicationServices(Configuration);
      services.AddInfrastructureServices(Configuration);

      services.AddVersionedApiExplorer(config =>
      {
        config.GroupNameFormat = "'v'VVV";
        config.SubstituteApiVersionInUrl = true;
      });

      services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();
      services.AddSwaggerGen(options =>
      {
        options.OperationFilter<SwaggerDefaultValues>();
      });

      // services.AddSwaggerGen(c =>
      // {
      //   c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api", Version = "v1" });
      // });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IApiVersionDescriptionProvider provider)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();

      }

      app.UseSwagger();
      app.UseSwaggerUI(options =>
      {
        // c.SwaggerEndpoint("/swagger/v1/swagger.json", "Api v1");
        options.RoutePrefix = string.Empty;
        foreach (var description in provider.ApiVersionDescriptions)
        {
          options.SwaggerEndpoint(
                $"/swagger/{description.GroupName}/swagger.json",
                description.GroupName.ToUpperInvariant());
        }
      });



      app.UseMiddleware<JwtMiddleware>();

      app.UseStaticFiles();
      // app.UseHttpsRedirection();

      app.UseRouting();

      app.UseMiddleware<ErrorHandler>();

      app.UseCors(
        options => options.SetIsOriginAllowed(x => _ = true).AllowAnyMethod().AllowAnyHeader().AllowCredentials()
      );

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
