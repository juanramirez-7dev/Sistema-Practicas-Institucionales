using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.DataAccess.ExternalServices.Models
{
    public class ExternalHistorialResponse
    {
        public int HistorialId { get; set; }

        public int EstudianteId { get; set; }

        public int AsignaturaId { get; set; }

        public int PeriodoId { get; set; }

        public decimal NotaFinal { get; set; }

        public int Estado { get; set; }

        public int CreditosAprobados { get; set; }
    }
}
