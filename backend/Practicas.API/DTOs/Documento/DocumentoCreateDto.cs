using Practicas.Domain.Enums;

namespace Practicas.API.DTOs.Documento
{
    public class DocumentoCreateDto
    {
        public TipoDocumento Tipo { get; set; }
        public IFormFile File { get; set; } = null!;
    }
}
