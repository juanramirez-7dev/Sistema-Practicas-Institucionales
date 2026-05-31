using Practicas.Domain.Entities;
using Practicas.Domain.Interfaces.Repositories;
using Practicas.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Services
{
    public class PerfilProfesionalService : IPerfilProfesionalService
    {
        private readonly IPerfilProfesionalRepository _repository;
        public PerfilProfesionalService(IPerfilProfesionalRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<PerfilProfesional>> GetAllAsync()
        {
            var perfiles = await _repository.GetAllAsync();
            if (perfiles == null || !perfiles.Any())
            {
                throw new InvalidOperationException("No se encontraron Perfiles.");
            }
            return perfiles;
        }
        public async Task<PerfilProfesional> GetByIdAsync(Guid id)
        {
            var perfil = await _repository.GetByIdAsync(id);
            if (perfil == null)
            {
                throw new KeyNotFoundException($"No se encontró el perfil profesional con ID: {id}");
            }
            return perfil;
        }
        public async Task UpdateAsync(PerfilProfesional perfil)
        {
            var existingPerfil = await _repository.GetByIdAsync(perfil.Id);
            if (existingPerfil == null)
            {
                throw new KeyNotFoundException($"No se encontró el perfil profesional con ID: {perfil.Id}");
            }
            existingPerfil.Descripcion = perfil.Descripcion;
            existingPerfil.Habilidades = perfil.Habilidades;
            existingPerfil.Tecnologias = perfil.Tecnologias;
            existingPerfil.UrlFoto = perfil.UrlFoto;
            await _repository.UpdateAsync(existingPerfil);
        }
    }
}
