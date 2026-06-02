using Practicas.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Entities
{
    public class Proceso
    {
        public Guid Id { get; set; }

        public EstadoProceso Estado { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public Guid EstudianteId { get; set; }

        public Estudiante Estudiante { get; set; } = null!;
        public ICollection<Documento> Documentos { get; set; } = new List<Documento>();
    }
}
