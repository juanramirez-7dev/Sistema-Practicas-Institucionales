namespace Practicas.API.DTOs.PerfilProfesional
{
    public class PerfilesResponseDTO
    {
        public int TotalPerfiles { get; set; }

        public IEnumerable<PerfilListadoResponseDTO> Perfiles { get; set; }
            = new List<PerfilListadoResponseDTO>();
    }
}
