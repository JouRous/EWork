using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using BC = BCrypt.Net.BCrypt;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Infrastructure.Data.Interfaces;
using Abstractions.Entities;
using Application.Services.Interfaces;
using Abstractions.ViewModels;
using Abstractions.Exceptions;

namespace Api.Controllers
{
  public class AuthController : BaseController
  {
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;
    private readonly IEmailService _emailService;
    private readonly IMongoRepository<User> _userRepository;

    public AuthController(
        IMapper mapper,
        IMongoRepository<User> userRepository,
        ITokenService tokenService,
        IEmailService emailService)
    {
      _mapper = mapper;
      _tokenService = tokenService;
      _emailService = emailService;
      _userRepository = userRepository;
    }


    [HttpPost("login")]
    public async Task<ActionResult> LoginAsync(LoginParams loginParams)
    {
      var user = await _userRepository.FindOneAsync(u => u.Email == loginParams.Email);
      if (user == null)
      {
        throw new BadRequestException("Email or password incorrect");
        // throw new NotFoundException("User dose not exist");
      }

      var isPasswordVerified = BC.Verify(loginParams.Password, user.Password);
      if (!isPasswordVerified)
      {
        throw new BadRequestException("Email or password incorrect");
      }

      return Ok(new
      {
        user = _mapper.Map<UserGetResult>(user),
        token = _tokenService.generateJwtToken(user)
      });
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterParams registerParams)
    {
      var userExisted = await _userRepository.FindOneAsync(x => x.Email == registerParams.Email);

      if (userExisted != null)
      {
        throw new BadRequestException("User already existed");
      }

      var user = _mapper.Map<User>(registerParams);
      user.Password = BC.HashPassword(registerParams.Password);

      await _userRepository.InsertOneAsync(user);

      return Ok(new
      {
        status = 200,
        message = "Success"
      });
    }

    [HttpPost("forget-password")]
    public async Task<ActionResult> ForgetPassword(ForgetPasswordParams forgetPasswordParams)
    {
      var user = await _userRepository.FindOneAsync(u => u.Email == forgetPasswordParams.Email);

      if (user == null)
      {
        throw new NotFoundException("User does not exist");
      }

      var resetPasswordToken = _tokenService.GenerateResetPasswordToken(forgetPasswordParams.Email);
      var resetPasswordLink = $"{forgetPasswordParams.Domain}?token={resetPasswordToken}";

      await _emailService.sendMailAsync(user.Email, "Forget password", $@"<a href=""http://{resetPasswordLink}"">http://{resetPasswordLink}</a>");

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }

    [HttpPost("reset-password")]
    public async Task<ActionResult> ResetPassword(ResetPasswordParams resetPasswordParams)
    {
      var handler = new JwtSecurityTokenHandler();
      var email = handler.ReadJwtToken(resetPasswordParams.Token).Claims
          .Where(c => c.Type.Equals("email"))
          .Select(c => c.Value)
          .SingleOrDefault();

      var user = await _userRepository.FindOneAsync(x => x.Email == email);
      user.Password = BC.HashPassword(resetPasswordParams.Password);

      await _userRepository.ReplaceOneAsync(user);

      return Ok(new
      {
        StatusCode = 200,
        Message = "Success"
      });
    }
  }
}