using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Entities
{
    public class SeleccionPerfil
    {
        public Guid Id { get; set; }

        public Guid EmpresaId { get; set; }
        public Empresa Empresa { get; set; } = null!;

        public Guid EstudianteId { get; set; }
        public Estudiante Estudiante { get; set; } = null!;

        public DateTime FechaSeleccion { get; set; }

        public bool Activo { get; set; } = true;
    }
}
