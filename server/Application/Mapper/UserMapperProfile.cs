using Abstractions.Entities;
using Abstractions.ViewModels;
using AutoMapper;

namespace Application.Mapper
{
  public class UserMapperProfile : Profile
  {
    public UserMapperProfile()
    {
      CreateMap<User, LoginParams>().ReverseMap();
      CreateMap<User, RegisterParams>().ReverseMap();

      CreateMap<User, UserGetResult>().ReverseMap();
    }
  }
}