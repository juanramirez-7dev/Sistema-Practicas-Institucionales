using Practicas.Domain.Enums;

namespace Practicas.API.DTOs.Documento
{
    public class DocumentoUpdateEstadoDto
    {
        public EstadoDocumento Estado { get; set; }
        public string? Observacion { get; set; } = null;
    }
}
