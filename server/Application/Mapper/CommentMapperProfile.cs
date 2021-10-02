using Abstractions.Entities;
using Abstractions.ViewModels;
using AutoMapper;

namespace Application.Mapper
{
  public class CommentMapperProfile : Profile
  {
    public CommentMapperProfile()
    {
      CreateMap<Comment, CreateCommentParams>().ReverseMap();
    }
  }
}