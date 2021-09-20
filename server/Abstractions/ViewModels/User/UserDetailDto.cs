namespace Abstractions.ViewModels
{
  public class UserDetailDto : UserGetResult
  {
    public string Email { get; set; }
    public string Avatar { get; set; }
  }
}