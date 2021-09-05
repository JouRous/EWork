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
    }
  }
}