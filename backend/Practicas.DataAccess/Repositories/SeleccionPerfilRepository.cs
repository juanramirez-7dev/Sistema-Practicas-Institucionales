using Practicas.DataAccess.Context;
using Practicas.Domain.Entities;
using Practicas.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace Practicas.DataAccess.Repositories
{
    public class SeleccionPerfilRepository:ISeleccionPerfilRepository
    {
        private readonly PracticasDbContext _context;

        public SeleccionPerfilRepository(
            PracticasDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SeleccionPerfil>>
            GetAllAsync()
        {
            return await _context.SeleccionesPerfil
                .Include(s => s.Empresa)
                .Include(s => s.Estudiante)
                .ToListAsync();
        }

        public async Task<SeleccionPerfil?> GetByIdAsync(
            Guid id)
        {
            return await _context.SeleccionesPerfil
                .Include(s => s.Empresa)
                .Include(s => s.Estudiante)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<IEnumerable<SeleccionPerfil>>
            GetByEmpresaIdAsync(Guid empresaId)
        {
            return await _context.SeleccionesPerfil
                .Include(s => s.Estudiante)
                .Where(s =>
                    s.EmpresaId == empresaId &&
                    s.Activo)
                .ToListAsync();
        }

        public async Task<SeleccionPerfil?>
            GetByEmpresaYEstudianteAsync(
                Guid empresaId,
                Guid estudianteId)
        {
            return await _context.SeleccionesPerfil
                .FirstOrDefaultAsync(s =>
                    s.EmpresaId == empresaId &&
                    s.EstudianteId == estudianteId);
        }

        public async Task CreateAsync(
            SeleccionPerfil seleccion)
        {
            await _context.SeleccionesPerfil
                .AddAsync(seleccion);
        }

        public Task UpdateAsync(
            SeleccionPerfil seleccion)
        {
            _context.SeleccionesPerfil
                .Update(seleccion);

            return Task.CompletedTask;
        }

        public async Task<IEnumerable<SeleccionPerfil>>
    GetByEstudianteIdAsync(Guid estudianteId)
        {
            return await _context.SeleccionesPerfil
                .Include(s => s.Empresa)
                .Where(s =>
                    s.EstudianteId == estudianteId &&
                    s.Activo)
                .ToListAsync();
        }





    }
}

