using Practicas.DataAccess.Context;
using Practicas.Domain.Entities;
using Practicas.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;


namespace Practicas.DataAccess.Repositories
{
    public class EmpresaRepository:IEmpresaRepository
    {
        private readonly PracticasDbContext _context;

        public EmpresaRepository(PracticasDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Empresa>> GetAllAsync()
        {
            return await _context.Empresas
                 .Include(e => e.Usuario)
                .ToListAsync();
        }

        public async Task<Empresa?> GetByIdAsync(Guid id)
        {
            return await _context.Empresas
                .Include(e => e.Usuario)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Empresa?> GetByNitAsync(string nit)
        {
            return await _context.Empresas
                .Include(e => e.Usuario)
                .FirstOrDefaultAsync(e => e.Nit == nit);
        }

        public async Task<Empresa?> GetByCorreoAsync(string correo)
        {
            return await _context.Empresas
                .Include(e => e.Usuario)
                .FirstOrDefaultAsync(e => e.Correo == correo);
        }

        public async Task CreateAsync(Empresa empresa)
        {
            await _context.Empresas.AddAsync(empresa);
        }

        public Task UpdateAsync(Empresa empresa)
        {
            _context.Empresas.Update(empresa);
            return Task.CompletedTask;
        }

        public async Task DeleteAsync(Guid id)
        {
            var empresa = await _context.Empresas.FindAsync(id);

            if (empresa != null)
            {
                _context.Empresas.Remove(empresa);
            }
        }
    }
}

