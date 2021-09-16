using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
  [Route("api/v{version:apiVersion}/[controller]")]
  [ApiController]
  public class BaseController : ControllerBase
  {
  }
}