using Abstractions.Entities;

namespace Application.Services.Interfaces
{
  public interface ITokenService
  {
    string generateJwtToken(User user);
    string GenerateResetPasswordToken(string email);
  }
}