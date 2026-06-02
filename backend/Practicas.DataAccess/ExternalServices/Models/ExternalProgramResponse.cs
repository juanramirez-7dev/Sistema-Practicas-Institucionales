using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.DataAccess.ExternalServices.Models
{
    public class ExternalProgramResponse
    {
        public int ProgramaId { get; set; }

        public string Codigo { get; set; } = string.Empty;

        public string Nombre { get; set; } = string.Empty;

        public string Nivel { get; set; } = string.Empty;

        public ExternalFacultyResponse Facultad { get; set; } = null!;
    }
}
