namespace Practicas.API.DTOs.Empresa
{
    public class EmpresaResponseDTO
    {
        public Guid Id { get; set; }

        public string Nit { get; set; } = string.Empty;

        public string Correo { get; set; } = string.Empty;

        public string Telefono { get; set; } = string.Empty;

        public string Direccion { get; set; } = string.Empty;

        public string RazonSocial { get; set; } = string.Empty;

        public string Sector { get; set; } = string.Empty;

        public string? SitioWeb { get; set; }

      
    }
}
