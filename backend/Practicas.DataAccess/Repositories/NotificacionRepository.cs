using Practicas.DataAccess.Context;
using Practicas.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using Practicas.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Practicas.DataAccess.Repositories
{
    public class NotificacionRepository: INotificacionRepository
    {
        private readonly PracticasDbContext _context;

        public NotificacionRepository(
            PracticasDbContext context)
        {
            _context = context;
        }

        public async Task CreateAsync(
            Notificacion notificacion)
        {
            await _context.Notificaciones.AddAsync(notificacion);
        }

        public async Task<IEnumerable<Notificacion>>
            GetByEstudianteIdAsync(Guid estudianteId)
        {
            return await _context.Notificaciones
                .Where(n => n.EstudianteId == estudianteId)
                .OrderByDescending(n => n.FechaCreacion)
                .ToListAsync();
        }

        public async Task<Notificacion?> GetByIdAsync(Guid id)
        {
            return await _context.Notificaciones
                .FirstOrDefaultAsync(n => n.Id == id);
        }

        public Task UpdateAsync(Notificacion notificacion)
        {
            _context.Notificaciones.Update(notificacion);
            return Task.CompletedTask;
        }
    }
}

