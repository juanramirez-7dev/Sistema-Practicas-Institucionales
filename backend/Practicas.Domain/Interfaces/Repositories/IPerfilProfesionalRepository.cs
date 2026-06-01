using Practicas.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Repositories
{
    public interface IPerfilProfesionalRepository
    {
        Task<IEnumerable<PerfilProfesional>> GetAllAsync();
        Task<PerfilProfesional?> GetByIdAsync(Guid id);
        Task CreateAsync(PerfilProfesional usuario);
        Task UpdateAsync(PerfilProfesional usuario);
        Task<PerfilProfesional?> GetByEstudianteIdAsync(Guid estudianteId);
    }
}
