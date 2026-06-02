using Practicas.Domain.Enums;

namespace Practicas.API.DTOs.Proceso
{
    public class ProcesoResponseDto
    {
        public Guid Id { get; set; }
        public EstadoProceso Estado { get; set; }
    }
}
