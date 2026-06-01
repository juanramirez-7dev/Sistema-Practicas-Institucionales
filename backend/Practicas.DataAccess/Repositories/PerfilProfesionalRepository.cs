using Microsoft.EntityFrameworkCore;
using Practicas.DataAccess.Context;
using Practicas.Domain.Entities;
using Practicas.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.DataAccess.Repositories
{
    public class PerfilProfesionalRepository : IPerfilProfesionalRepository
    {
        private readonly PracticasDbContext _context;
        public PerfilProfesionalRepository(PracticasDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PerfilProfesional>> GetAllAsync()
        {
            return await _context.PerfilesProfesionales.ToListAsync();
        }
        
        public async Task CreateAsync(PerfilProfesional usuario)
        {
            await _context.PerfilesProfesionales.AddAsync(usuario);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(PerfilProfesional usuario)
        {
            _context.PerfilesProfesionales.Update(usuario);
            await _context.SaveChangesAsync();
        }

        public async Task<PerfilProfesional?> GetByIdAsync(Guid id)
        {
            return await _context.PerfilesProfesionales
                .Include(p => p.Estudiante)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<PerfilProfesional?> GetByEstudianteIdAsync(Guid estudianteId)
        {
            return await _context.PerfilesProfesionales
                .Include(p => p.Estudiante)
                .FirstOrDefaultAsync(p => p.EstudianteId == estudianteId);
        }
    }
}
