using Practicas.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Services
{
    public interface IEmpresaService
    {
        
        Task<IEnumerable<Empresa>> GetAllAsync();

        Task<Empresa> GetByIdAsync(Guid id);

        Task<Empresa> GetByNitAsync(string nit);

        Task<Empresa> GetByCorreoAsync(string correo);

        Task<Empresa> CreateAsync(Empresa empresa);

        Task UpdateAsync(Empresa empresa);

        Task DeleteAsync(Guid id);
    }
}
