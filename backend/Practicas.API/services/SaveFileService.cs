using Practicas.Domain.Interfaces.Services;

namespace Practicas.API.services
{
    public class SaveFileService: ISaveFileService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly IConfiguration _configuration;

        public SaveFileService(IWebHostEnvironment environment, IConfiguration configuration)
        {
            _environment = environment;
            _configuration = configuration;
        }
        public async Task<string> SaveFileAsync(Stream fileStream, string extension)
        {
            string fileName = $"{Guid.NewGuid()}{extension}";

            string uploadPath = Path.Combine(
                _environment.WebRootPath!,
                "uploads"
            );

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            string destinationPath = Path.Combine(
                uploadPath,
                fileName
            );

            using var destinationStream = new FileStream(
                destinationPath,
                FileMode.Create
            );

            await fileStream.CopyToAsync(destinationStream);

            string baseUrl = _configuration["BaseUrl:development"]!;

            return $"{baseUrl}/uploads/{fileName}";
        }

        public Task<bool> RemoveFileAsync(string fileUrl)
        {
            if (string.IsNullOrWhiteSpace(fileUrl))
                return Task.FromResult(false);

            if (!Uri.TryCreate(fileUrl, UriKind.Absolute, out var uri))
                return Task.FromResult(false);

            string fileName = Path.GetFileName(uri.LocalPath);
            if (string.IsNullOrWhiteSpace(fileName))
                return Task.FromResult(false);

            string uploadPath = Path.Combine(
                _environment.WebRootPath!,
                "uploads"
            );

            string destinationPath = Path.Combine(uploadPath, fileName);

            if (!File.Exists(destinationPath))
                return Task.FromResult(false);

            File.Delete(destinationPath);

            return Task.FromResult(true);
        }
    }
}
