namespace Practicas.API.DTOs.Empresa
{
    public class EmpresasInteresadasResponseDTO
    {
        public int TotalEmpresasInteresadas { get; set; }

        public IEnumerable<EmpresaInteresadaResponseDTO> Empresas { get; set; }
            = new List<EmpresaInteresadaResponseDTO>();
    }
}
