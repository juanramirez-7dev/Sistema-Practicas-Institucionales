using Practicas.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Repositories
{
    public interface IEstudianteRepository
    {
        Task<IEnumerable<Estudiante>> GetAllAsync();
        Task<Estudiante?> GetByIdAsync(Guid id);
        Task<Estudiante?> GetByCorreoAsync(string correo);
        Task<Estudiante?> GetByCarnetAsync(int carnet);
        Task<Estudiante?> GetByDocumentoAsync(string documento);
        Task CreateAsync(Estudiante usuario);
        Task UpdateAsync(Estudiante usuario);
        Task DeleteAsync(Guid id);

        Task<Estudiante> GetByUsuarioIdAsync(Guid usuarioId);

        Task<IEnumerable<Estudiante>> BuscarPerfilesAsync(string? textoBusqueda, string? carrera);
        
    }
}
