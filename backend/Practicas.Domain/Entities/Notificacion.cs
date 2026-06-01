using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Entities
{
    public class Notificacion
    {
        public Guid Id { get; set; }

        public Guid EstudianteId { get; set; }

        public string Mensaje { get; set; } = string.Empty;

        public DateTime FechaCreacion { get; set; }

        public bool Leida { get; set; } = false;

        public Estudiante Estudiante { get; set; } = null!;
    }
}
