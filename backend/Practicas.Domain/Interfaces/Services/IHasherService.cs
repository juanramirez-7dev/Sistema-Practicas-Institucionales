using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Services
{
    public interface IHasherService
    {
        string HashPassword(string password);
        bool VerifyPassword(string password, string hash);
    }
}
