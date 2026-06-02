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
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly PracticasDbContext _context;
        public UsuarioRepository(PracticasDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Usuario>> GetAllAsync()
        {
            return await _context.Usuarios.ToListAsync();
        }
        public async Task<Usuario?> GetByIdAsync(Guid id)
        {
            return await _context.Usuarios.FindAsync(id);
        }
        public async Task CreateAsync(Usuario usuario)
        {
            await _context.Usuarios.AddAsync(usuario);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(Usuario usuario)
        {
            _context.Usuarios.Update(usuario);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(Guid id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario != null)
            {
                _context.Usuarios.Remove(usuario);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<Usuario?> GetByUserIdAndRolAsync(string login)    
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Login == login);
            switch (usuario?.Rol)
            {
                case RolUsuario.Estudiante:
                    var estudiante = await _context.Usuarios.Include(u => u.Estudiante)
                       .FirstOrDefaultAsync(u => u.Login == login);
                    return estudiante;
                case RolUsuario.Empresa:
                    var empresa = await _context.Usuarios.Include(u => u.Empresa)
                        .FirstOrDefaultAsync(u => u.Login == login);
                    return empresa;
                case RolUsuario.Oficina:
                    var oficina = await _context.Usuarios.Include(u => u.OficinaEmpleado)
                        .FirstOrDefaultAsync(u => u.Login == login);
                    return oficina;
                default:
                    return null;
            }
        }
    }
}
