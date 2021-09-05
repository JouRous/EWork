using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace Application.Services.Interfaces
{
  public interface ICloudinaryService
  {
    Task<ImageUploadResult> UploadImageAsync(IFormFile file);
    Task<DeletionResult> DeleteImageAsync(string publicId);
  }
}