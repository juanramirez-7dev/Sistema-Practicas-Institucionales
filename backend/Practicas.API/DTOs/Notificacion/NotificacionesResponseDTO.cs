namespace Practicas.API.DTOs.Notificacion
{
    public class NotificacionesResponseDTO
    {
        public int TotalNotificaciones { get; set; }

        public int NoLeidas { get; set; }

        public IEnumerable<NotificacionResponseDTO> Notificaciones { get; set; }
            = new List<NotificacionResponseDTO>();
    }
}
