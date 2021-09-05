using Abstractions.Entities;
using Abstractions.ViewModels;
using AutoMapper;

namespace Application.Mapper
{
  public class ProjectMapperProfile : Profile
  {
    public ProjectMapperProfile()
    {
      CreateMap<Project, CreateProjectParams>().ReverseMap();

      CreateMap<Project, ProjectGetResult>();
    }
  }
}