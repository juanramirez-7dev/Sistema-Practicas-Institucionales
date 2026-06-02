using Practicas.Domain.Entities;
using Practicas.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Repositories
{
    public interface IDocumentoRepository
    {
        Task<IEnumerable<Documento>> GetByProcesoIdAsync(Guid procesoId);
        Task<Documento?> GetByIdAsync(Guid id);
        Task CreateAsync(Documento documento);
        Task UpdateAsync(Documento documento);
        Task DeleteAsync(Guid id);
        Task<bool> ExistByTipoInProceso(Guid procesoId, TipoDocumento tipo);
         

    }
}
