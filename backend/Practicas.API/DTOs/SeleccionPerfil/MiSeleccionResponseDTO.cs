namespace Practicas.API.DTOs.SeleccionPerfil
{
    public class MiSeleccionResponseDTO
    {
        public int TotalSeleccionados { get; set; }

        public IEnumerable<SeleccionPerfilResponseDTO> Selecciones { get; set; }
            = new List<SeleccionPerfilResponseDTO>();
    }
}
