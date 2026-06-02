namespace Practicas.API.DTOs.PerfilProfesional
{
    public class PerfilProfesionalRequestDTO
    {
        public string Descripcion { get; set; } = string.Empty;

        public string Habilidades { get; set; } = string.Empty;

        public string Tecnologias { get; set; } = string.Empty;

        public string? UrlFoto { get; set; }
    }
}
