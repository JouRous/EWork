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
        .ForMember(dest => dest.ListItemIds, opt =>
        {
          opt.MapFrom(src => src.Lists.Select(list => list.Id));
        });
    }
  }
}