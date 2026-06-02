using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Entities
{
    public class OficinaEmpleado
    {
        public Guid Id { get; set; }
        public string Codigo { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string Sede { get; set; } = string.Empty;
        public Guid UsuarioId { get; set; }

        public Usuario Usuario { get; set; } = null!;
    }
}
