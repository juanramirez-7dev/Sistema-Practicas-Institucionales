using Practicas.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Services
{
    public interface IPerfilProfesionalService
    {
        Task<IEnumerable<PerfilProfesional>> GetAllAsync();
        Task<PerfilProfesional> GetByIdAsync(Guid id);
        Task UpdateAsync(PerfilProfesional perfil);

        Task<PerfilProfesional?> GetByEstudianteIdAsync(Guid estudianteId);
    }
}
