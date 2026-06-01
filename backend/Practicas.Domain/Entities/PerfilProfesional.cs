using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Entities
{
    public class PerfilProfesional
    {
        public Guid Id { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        public string Habilidades { get; set; } = string.Empty;
        public string Tecnologias { get; set; } = string.Empty;
        public string? UrlFoto { get; set; }

        public Guid EstudianteId { get; set; }
        public Estudiante Estudiante { get; set; } = null!;
    }
}
