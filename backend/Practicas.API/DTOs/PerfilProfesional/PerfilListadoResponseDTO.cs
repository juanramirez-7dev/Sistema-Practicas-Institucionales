namespace Practicas.API.DTOs.PerfilProfesional
{
    public class PerfilListadoResponseDTO
    {
        public Guid EstudianteId { get; set; }

        public string Nombre { get; set; } = string.Empty;

        public string Carrera { get; set; } = string.Empty;

        public string Habilidades { get; set; } = string.Empty;

        public string? UrlFoto { get; set; }


        public bool Seleccionado { get; set; }
    }
}
