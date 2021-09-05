using Abstractions.Entities;
using Abstractions.ViewModels;
using AutoMapper;

namespace Application.Mapper
{
  public class ListMapperProfile : Profile
  {
    public ListMapperProfile()
    {
      CreateMap<ListItem, CreateListParams>().ReverseMap();

      CreateMap<ListItem, ListItemGetResult>().ReverseMap();
    }
  }
}