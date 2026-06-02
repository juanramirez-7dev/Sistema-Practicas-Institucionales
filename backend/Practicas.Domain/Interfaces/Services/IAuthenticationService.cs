using Practicas.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Services
{
    public interface IAuthenticationService
    {
        Task<(string Token, Guid UserId, string Role)> LoginAsync(string login, string password);
    }
}
