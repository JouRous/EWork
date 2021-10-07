using System.Linq;
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

      CreateMap<Project, ProjectGetResult>()
        .ForMember(src => src.BoardIds, opt => opt.MapFrom(src => src.Boards.Select(x => x.Id)))
        .ForMember(src => src.MembersCount, opt => opt.MapFrom(src => src.UserProjects.Count()));
    }
  }
}