using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Events
{
    public class EstudianteSeleccionadoEvent
    {
        public Guid EstudianteId { get; set; }

        public Guid EmpresaId { get; set; }

        public string NombreEmpresa { get; set; } = string.Empty;

        public DateTime FechaSeleccion { get; set; }
    }
}
