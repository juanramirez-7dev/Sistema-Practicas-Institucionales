namespace Practicas.API.DTOs
{
    public class SeleccionPerfilResponseDTO
    {
        public Guid SeleccionId { get; set; }

        public Guid EstudianteId { get; set; }

        public string Nombre { get; set; } = string.Empty;

        public string Correo { get; set; } = string.Empty;

        public string Telefono { get; set; } = string.Empty;

        public string Carrera { get; set; } = string.Empty;

        public DateTime FechaSeleccion { get; set; }
    }
}
