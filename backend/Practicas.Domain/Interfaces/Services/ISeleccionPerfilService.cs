using Practicas.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Services
{
    public interface ISeleccionPerfilService
    {
        Task SeleccionarEstudianteAsync(Guid empresaId, Guid estudianteId);

        Task<IEnumerable<SeleccionPerfil>> GetByEmpresaIdAsync(Guid empresaId);

        Task DesactivarSeleccionAsync(Guid seleccionId);

        Task<IEnumerable<SeleccionPerfil>> GetByEstudianteIdAsync(Guid estudianteId);

    }
}
