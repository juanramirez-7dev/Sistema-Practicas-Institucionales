namespace Practicas.API.DTOs
{
    public class MiSeleccionResponseDTO
    {
        public int TotalSeleccionados { get; set; }

        public IEnumerable<SeleccionPerfilResponseDTO> Selecciones { get; set; }
            = new List<SeleccionPerfilResponseDTO>();
    }
}
