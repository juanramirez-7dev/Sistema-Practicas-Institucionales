namespace Practicas.API.DTOs
{
    public class EmpresaInteresadaResponseDTO
    {
        public Guid SeleccionId { get; set; }

        public Guid EmpresaId { get; set; }

        public string RazonSocial { get; set; } = string.Empty;

        public string Sector { get; set; } = string.Empty;

        public string Correo { get; set; } = string.Empty;

        public string Telefono { get; set; } = string.Empty;

        public DateTime FechaSeleccion { get; set; }
    }
}
