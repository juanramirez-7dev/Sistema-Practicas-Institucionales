using Microsoft.EntityFrameworkCore;
using Practicas.DataAccess.Context;
using Practicas.Domain.Entities;
using Practicas.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.DataAccess.Repositories
{
    public class ProcesoRepository: IProcesoRepository
    {
        private readonly PracticasDbContext _context;

        public ProcesoRepository(PracticasDbContext context)
        {
            _context = context;
        }

        public async Task<Proceso?> GetByIdAsync(Guid id)
        {
            return await _context.Procesos.FindAsync(id);
        }

        public async Task<Proceso?> GetByEstudianteId(Guid estudianteId)
        {
            return await _context.Procesos.FirstOrDefaultAsync(p => p.EstudianteId == estudianteId);
        }

        public async Task<Proceso?> GetByIdWithDocumentos(Guid id)
        {
            return await _context.Procesos
                .Include(p => p.Documentos)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task CreateAsync(Proceso proceso)
        {
            await _context.Procesos.AddAsync(proceso);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Proceso proceso)
        {
            _context.Procesos.Update(proceso);
            await _context.SaveChangesAsync();
        }
    }
}
