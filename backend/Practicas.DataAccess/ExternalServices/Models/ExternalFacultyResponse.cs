using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.DataAccess.ExternalServices.Models
{
    public class ExternalFacultyResponse
    {
        public int Id { get; set; }

        public string Codigo { get; set; } = string.Empty;

        public string Nombre { get; set; } = string.Empty;
    }
}
