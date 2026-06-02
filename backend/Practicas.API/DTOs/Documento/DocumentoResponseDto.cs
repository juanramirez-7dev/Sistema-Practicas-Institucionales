using Practicas.Domain.Enums;

namespace Practicas.API.DTOs.Documento
{
    public class DocumentoResponseDto
    {
        public Guid Id { get; set; }
        public EstadoDocumento Estado { get; set; }
        public TipoDocumento Tipo { get; set; }
        public string? Observacion { get; set; }
        public DateTime FechaCarga { get; set; }
        public string Url { get; set; } = string.Empty;
        public Guid ProcesoId { get; set; }
    }
}
