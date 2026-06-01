using Practicas.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Repositories
{
    public interface ISeleccionPerfilRepository
    {
        Task<IEnumerable<SeleccionPerfil>> GetAllAsync();

        Task<SeleccionPerfil?> GetByIdAsync(Guid id);

        Task<IEnumerable<SeleccionPerfil>> GetByEmpresaIdAsync(
            Guid empresaId);

        Task<SeleccionPerfil?> GetByEmpresaYEstudianteAsync(
            Guid empresaId,
            Guid estudianteId);

        Task CreateAsync(SeleccionPerfil seleccion);

        Task UpdateAsync(SeleccionPerfil seleccion);

        //para que un estudiante vea las empreesas que lo seleccionaron

        Task<IEnumerable<SeleccionPerfil>> GetByEstudianteIdAsync(Guid estudianteId);

    }
}
