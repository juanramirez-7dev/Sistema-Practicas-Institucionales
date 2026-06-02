using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Services
{
    public interface IJwtService
    {
        string GenerateToken(Guid userId, string role);
    }
}
