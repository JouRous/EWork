using System.Linq;
using Abstractions.Entities;
using Abstractions.ViewModels;
using AutoMapper;

namespace Application.Mapper
{
  public class BoardMapperProfile : Profile
  {
    public BoardMapperProfile()
    {
      CreateMap<Board, CreateBoardParams>().ReverseMap();

      CreateMap<Board, BoardGetResult>();

      CreateMap<Board, BoardDetailDto>()
        .ForMember(dest => dest.Members, opt =>
        {
          opt.MapFrom(src => src.Project.UserProjects.Select(x => x.User));
        });
    }
  }
}