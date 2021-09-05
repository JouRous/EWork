using System.Threading.Tasks;

namespace Application.Services.Interfaces
{
  public interface IEmailService
  {
    Task sendMailAsync(string to, string subject, string html);
  }
}