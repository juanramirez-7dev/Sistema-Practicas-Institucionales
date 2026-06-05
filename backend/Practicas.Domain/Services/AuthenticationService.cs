using Practicas.Domain.Entities;
using Practicas.Domain.Enums;
using Practicas.Domain.Interfaces.Repositories;
using Practicas.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;

namespace Practicas.Domain.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IHasherService _hasherService;
        private readonly IJwtService _jwtService;
        public AuthenticationService(IHasherService hasherService, IUsuarioRepository usuarioRepository, IJwtService jwtService)
        {
            _hasherService = hasherService;
            _usuarioRepository = usuarioRepository;
            _jwtService = jwtService;
        }

        public async Task<(string Token, Guid UserId, string Role)> LoginAsync(string login, string password)
        {
            var usuario = await _usuarioRepository.GetByUserIdAndRolAsync(login);
            if (usuario == null)
            {
                throw new KeyNotFoundException($"Usuario con el email {login} no existe.");
            }
            if (!_hasherService.VerifyPassword(password, usuario.PasswordHash))
            {
                throw new InvalidOperationException($"La contraseña o el correo son incorrectos");
            }

            Guid relationId = Guid.Empty;

            switch (usuario.Rol)
            {
                case RolUsuario.Estudiante:
                    relationId = usuario.Estudiante.Id;
                    break;
                case RolUsuario.Empresa:
                    relationId = usuario.Empresa.Id;
                    break;
                case RolUsuario.Oficina:
                    relationId = usuario.OficinaEmpleado.Id;
                    break;
            }

            var token = _jwtService.GenerateToken(relationId, usuario.Rol.ToString());
            var response = (Token: token, UserId: relationId, Role: usuario.Rol.ToString());

            return response;
        }
    }
}
