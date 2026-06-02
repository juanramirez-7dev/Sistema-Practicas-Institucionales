using Practicas.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Repositories
{
    public interface IProcesoRepository
    {
        Task<Proceso?> GetByIdAsync(Guid id);
        Task<Proceso?> GetByEstudianteId(Guid estudianteId);
        Task<Proceso?> GetByIdWithDocumentos(Guid id);
        Task CreateAsync(Proceso proceso);
        Task UpdateAsync(Proceso proceso);
    }
}
