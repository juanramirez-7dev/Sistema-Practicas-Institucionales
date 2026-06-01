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
            if (string.IsNullOrWhiteSpace(perfil.Descripcion))
            {
                throw new InvalidOperationException(
                    "La descripción no puede estar vacía.");
            }

            if (string.IsNullOrWhiteSpace(perfil.Habilidades))
            {
                throw new InvalidOperationException(
                    "Las habilidades no pueden estar vacías.");
            }

            if (string.IsNullOrWhiteSpace(perfil.Tecnologias))
            {
                throw new InvalidOperationException(
                    "Las tecnologías no pueden estar vacías.");
            }
            existingPerfil.Descripcion = perfil.Descripcion;
            existingPerfil.Habilidades = perfil.Habilidades;
            existingPerfil.Tecnologias = perfil.Tecnologias;
            existingPerfil.UrlFoto = perfil.UrlFoto;
            await _repository.UpdateAsync(existingPerfil);
        }
        public async Task<PerfilProfesional> GetByEstudianteIdAsync(Guid estudianteId)
        {
            var perfil = await _repository.GetByEstudianteIdAsync(estudianteId);

            if (perfil == null)
            {
                throw new KeyNotFoundException(
                    $"No se encontró un perfil profesional para el estudiante con ID: {estudianteId}");
            }

            return perfil;
        }
    }
}
