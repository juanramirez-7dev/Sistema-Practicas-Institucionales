using Practicas.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Entities
{
    public class Usuario
    {
        public Guid Id { get; set; }
        public string Login { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public RolUsuario Rol { get; set; }

        public Estudiante? Estudiante { get; set; }
        public OficinaEmpleado? OficinaEmpleado { get; set; }
    }
}
