using Org.BouncyCastle.Bcpg;
using Practicas.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Entities
{
    public class Documento
    {
        public Guid Id { get; set; }
        public EstadoDocumento Estado { get; set; }
        public TipoDocumento Tipo { get; set; }
        public string? Observacion { get; set; }
        public DateTime FechaCarga { get; set; }
        public string Url { get; set; } = string.Empty;
        public Guid ProcesoId { get; set; }

        public Proceso Proceso { get; set; } = null!;
    }
}
