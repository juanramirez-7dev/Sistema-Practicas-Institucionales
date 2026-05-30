using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Entities
{
    public class Estudiante
    {
        public Guid Id { get; set; }
        public string carnet { get; set; } = string.Empty;
        public string DocumentoIdentidad { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string Correo { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public string Carrera { get; set; } = string.Empty;
        public string Facultad { get; set; } = string.Empty;
        public int CreditosAprobados { get; set; }

        public Usuario Usuario { get; set; } = null!;

    }
}
