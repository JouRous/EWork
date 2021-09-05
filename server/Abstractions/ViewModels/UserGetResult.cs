namespace Abstractions.ViewModels
{
  public class UserGetResult : BaseGetResult
  {
    public string Email { get; set; }
    public string Username { get; set; }
  }
}