namespace Practicas.API.DTOs
{
    public class EstudianteResponseDto
    {
        public Guid Id { get; set; }
        public int Carnet { get; set; }
        public string DocumentoIdentidad { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string Correo { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public string Carrera { get; set; } = string.Empty;
        public string Facultad { get; set; } = string.Empty;
        public int CreditosAprobados { get; set; }
    }
}
