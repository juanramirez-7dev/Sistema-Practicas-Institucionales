namespace Practicas.API.DTOs.PerfilProfesional
{
    public class PerfilProfesionalResponseDTO
    {
        public Guid Id { get; set; }

        public Guid EstudianteId { get; set; }

        public string Nombre { get; set; } = string.Empty;

        public string Correo { get; set; } = string.Empty;

        public string Telefono { get; set; } = string.Empty;

        public string Carrera { get; set; } = string.Empty;

        public string Descripcion { get; set; } = string.Empty;

        public string Habilidades { get; set; } = string.Empty;

        public string Tecnologias { get; set; } = string.Empty;

        public string? UrlFoto { get; set; }

        public string? UrlHojaVida { get; set; }
    }
}
