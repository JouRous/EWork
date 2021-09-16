using Abstractions.Entities;
using Abstractions.ViewModels;
using AutoMapper;

namespace Application.Mapper
{
  public class TicketMapperProfile : Profile
  {
    public TicketMapperProfile()
    {
      CreateMap<Ticket, CreateTicketParams>().ReverseMap();

      CreateMap<Ticket, TicketGetResult>();
    }
  }
}