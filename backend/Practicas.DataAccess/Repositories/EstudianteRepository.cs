using Microsoft.EntityFrameworkCore;
using Practicas.DataAccess.Context;
using Practicas.Domain.Entities;
using Practicas.Domain.Enums;
using Practicas.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

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

        public async Task<IEnumerable<Estudiante>> BuscarPerfilesAsync(string? textoBusqueda, string? carrera)

        {
            IQueryable<Estudiante> query = _context.Estudiantes
                .Include(e => e.PerfilProfesional)
                .Include(e => e.Proceso)
                .Where(e => e.Proceso.Estado == EstadoProceso.Visible_Para_Empresas);

            if (!string.IsNullOrWhiteSpace(textoBusqueda))
            {
                textoBusqueda = textoBusqueda.Trim();

                query = query.Where(e =>
                    e.Nombre.Contains(textoBusqueda) ||
                    e.PerfilProfesional.Habilidades.Contains(textoBusqueda) ||
                    e.PerfilProfesional.Tecnologias.Contains(textoBusqueda));
            }

            if (!string.IsNullOrWhiteSpace(carrera))
            {
                query = query.Where(e => e.Carrera == carrera);
            }

            return await query.ToListAsync();
        }


            public async Task<Estudiante?> GetByUsuarioIdAsync(Guid usuarioId)
        {
            return await _context.Estudiantes
                .Include(e => e.PerfilProfesional)
                .FirstOrDefaultAsync(e => e.UsuarioId == usuarioId);
        }

    
    }
}
