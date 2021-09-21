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

      CreateMap<Board, BoardGetResult>()
        .ForMember(dest => dest.Members, opt =>
        {
          opt.MapFrom(src => src.UserBoards.Select(x => x.User));
        });

      CreateMap<Board, BoardDetailDto>()
        .ForMember(dest => dest.Members, opt =>
        {
          opt.MapFrom(src => src.UserBoards.Select(x => x.User));
        });
      // .ForMember(dest => dest.Members, opt => 
      // {
      //   opt.MapFrom(src => src.)
      // })

    }
  }
}