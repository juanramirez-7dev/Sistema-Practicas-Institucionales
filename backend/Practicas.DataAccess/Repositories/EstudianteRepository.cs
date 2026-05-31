using Practicas.DataAccess.Context;
using Practicas.Domain.Interfaces.Repositories;
using Practicas.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace Practicas.DataAccess.Repositories
{
    public class EstudianteRepository : IEstudianteRepository
    {
        private readonly PracticasDbContext _context;
        public EstudianteRepository(PracticasDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Estudiante>> GetAllAsync()
        {
            return await _context.Estudiantes.ToListAsync();
        }
        public async Task<Estudiante?> GetByIdAsync(Guid id)
        {
            return await _context.Estudiantes.FindAsync(id);
        }
        public async Task<Estudiante?> GetByCorreoAsync(string correo)
        {
            return await _context.Estudiantes.FirstOrDefaultAsync(e => e.Correo == correo);
        }
        public async Task<Estudiante?> GetByCarnetAsync(int carnet)
        {
            return await _context.Estudiantes.FirstOrDefaultAsync(e => e.Carnet == carnet);
        }
        public async Task<Estudiante?> GetByDocumentoAsync(string documento)
        {
            return await _context.Estudiantes.FirstOrDefaultAsync(e => e.DocumentoIdentidad == documento);
        }
        public async Task CreateAsync(Estudiante usuario)
        {
            await _context.Estudiantes.AddAsync(usuario);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(Estudiante usuario)
        {
            _context.Estudiantes.Update(usuario);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(Guid id)
        {
            var usuario = await _context.Estudiantes.FindAsync(id);
            if (usuario != null)
            {
                _context.Estudiantes.Remove(usuario);
                await _context.SaveChangesAsync();
            }
        }
    }
}
