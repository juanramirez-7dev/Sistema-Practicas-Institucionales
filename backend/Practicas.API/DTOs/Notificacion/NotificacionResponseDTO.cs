namespace Practicas.API.DTOs.Notificacion
{
    public class NotificacionResponseDTO
    {
        public Guid Id { get; set; }

        public string Mensaje { get; set; } = string.Empty;

        public DateTime FechaCreacion { get; set; }

        public bool Leida { get; set; }
    }
}
