using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Services
{
    public interface ISaveFileService
    {
        Task<string> SaveFileAsync(Stream fileStream, string extension);
        Task<bool> RemoveFileAsync(string fileUrl);

    }
}
