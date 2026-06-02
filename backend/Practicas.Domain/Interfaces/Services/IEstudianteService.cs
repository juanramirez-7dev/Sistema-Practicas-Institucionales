using Practicas.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Services
{
    public interface IEstudianteService
    {
        Task<IEnumerable<Estudiante>> GetAllAsync();
        Task<Estudiante> GetByIdAsync(Guid id);
        Task<Estudiante> GetByCorreoAsync(string correo);
        Task<Estudiante> GetByCarnetAsync(int carnet);
        Task<Estudiante> GetByDocumentoAsync(string documento);
        Task<Estudiante> GetExternalStudentAsync(string documento);
        Task<int> GetApprovedCreditsAsync(string documento);
        Task<Estudiante> CreateAsync(string document);
        Task UpdateAsync(string documento);
        Task DeleteAsync(Guid id);

        Task<IEnumerable<Estudiante>> BuscarPerfilesAsync(
         string? textoBusqueda,
         string? carrera);

        Task<Estudiante> GetByUsuarioIdAsync(Guid usuarioId);


    }
}
