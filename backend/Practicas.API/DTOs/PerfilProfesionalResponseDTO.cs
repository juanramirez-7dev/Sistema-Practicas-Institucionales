namespace Practicas.API.DTOs
{
    public class PerfilProfesionalResponseDTO
    {
        public Guid Id { get; set; }

        public Guid EstudianteId { get; set; }

        public string Nombre { get; set; } = string.Empty;

        public string Correo { get; set; } = string.Empty;

        public string Telefono { get; set; } = string.Empty;

        public string Carrera { get; set; } = string.Empty;

        public string Facultad { get; set; } = string.Empty;

        public int CreditosAprobados { get; set; }

        public decimal PromedioAcademico { get; set; }

        public string Descripcion { get; set; } = string.Empty;

        public string Habilidades { get; set; } = string.Empty;

        public string Tecnologias { get; set; } = string.Empty;

        public string? UrlFoto { get; set; }
    }
}
