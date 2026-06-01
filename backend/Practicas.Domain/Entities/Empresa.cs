using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Entities
{
    public class Empresa
    {
        public Guid Id { get; set; }

        public string Nit { get; set; } = string.Empty;

        
        public string Correo { get; set; } = string.Empty;

        public string Telefono { get; set; } = string.Empty;

        public string Direccion { get; set; } = string.Empty;

        public string RazonSocial { get; set; } = string.Empty;

        public string Sector { get; set; } = string.Empty;

        public string? SitioWeb { get; set; }

        public Guid UsuarioId { get; set; }

        public Usuario Usuario { get; set; } = null!;

        public ICollection<SeleccionPerfil> Selecciones { get; set; }
            = new List<SeleccionPerfil>();
    }
}
