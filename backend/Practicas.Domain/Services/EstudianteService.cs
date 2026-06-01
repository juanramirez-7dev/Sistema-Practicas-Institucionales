using Practicas.Domain.Entities;
using Practicas.Domain.Enums;
using Practicas.Domain.Interfaces.Repositories;
using Practicas.Domain.Interfaces.Services;
using Practicas.Domain.Interfaces.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Services
{
    public class EstudianteService : IEstudianteService
    {
        private readonly IEstudianteRepository _estudianteRepository;
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IHasherService _hasherService;
        private readonly IPerfilProfesionalRepository _perfilProfesionalRepository;
        private readonly IUnitOfWork _unitOfWork;
        public EstudianteService(IEstudianteRepository estudianteRepository, IUsuarioRepository usuarioRepository, IHasherService hasherService, IUnitOfWork unitOfWork, IPerfilProfesionalRepository perfilProfesionalRepository)
        {
            _estudianteRepository = estudianteRepository;
            _hasherService = hasherService;
            _usuarioRepository = usuarioRepository;
            _unitOfWork = unitOfWork;
            _perfilProfesionalRepository = perfilProfesionalRepository;
        }

        public async Task<IEnumerable<Estudiante>> GetAllAsync()
        {
            var estudiantes = await _estudianteRepository.GetAllAsync();
            if (estudiantes == null || !estudiantes.Any())
            {
                throw new InvalidOperationException("No se encontraron estudiantes.");
            }
            return estudiantes;
        }
        public async Task<Estudiante> GetByIdAsync(Guid id)
        {
            var Estudiante = await _estudianteRepository.GetByIdAsync(id);
            if (Estudiante == null)
            {
                throw new KeyNotFoundException($"No se encontró el estudiante con ID: {id}");
            }
            return Estudiante;
        }
        public async Task<Estudiante> GetByCorreoAsync(string correo)
        {
            if (string.IsNullOrWhiteSpace(correo))
            {
                throw new InvalidOperationException("El correo electrónico no puede estar vacío.");
            }
            try
            {
                var mail = new System.Net.Mail.MailAddress(correo);
            }
            catch
            {
                throw new InvalidOperationException("El correo electrónico no es válido.");
            }
            var Estudiante = await _estudianteRepository.GetByCorreoAsync(correo);
            if (Estudiante == null)
            {
                throw new KeyNotFoundException($"No se encontró el estudiante con correo: {correo}");
            }
            return Estudiante;
        }
        public async Task<Estudiante> GetByCarnetAsync(int carnet)
        {
            var Estudiante = await _estudianteRepository.GetByCarnetAsync(carnet);
            if (Estudiante == null)
            {
                throw new KeyNotFoundException($"No se encontró el estudiante con carnet: {carnet}");
            }
            return Estudiante;
        }
        public async Task<Estudiante> GetByDocumentoAsync(string documento)
        {
            var Estudiante = await _estudianteRepository.GetByDocumentoAsync(documento);
            if (Estudiante == null)
            {
                throw new KeyNotFoundException($"No se encontró el estudiante con documento: {documento}");
            }
            return Estudiante;
        }
        public async Task CreateAsync(Estudiante estudiante)
        {
            if (string.IsNullOrWhiteSpace(estudiante.Nombre))
            {
                throw new InvalidOperationException("El nombre del estudiante no puede estar vacío.");
            }
            if (estudiante.Telefono.Length < 7)
            {
                throw new InvalidOperationException("El teléfono no es válido.");
            }
            try
            {
                var mail = new System.Net.Mail.MailAddress(estudiante.Correo);
            }
            catch
            {
                throw new InvalidOperationException("El correo electrónico no es válido.");
            }
            if (estudiante.CreditosAprobados < 0)
            {
                throw new InvalidOperationException("Los créditos aprobados no pueden ser negativos.");
            }
            if (estudiante.PromedioAcademico < 0 || estudiante.PromedioAcademico > 5)
            {
                throw new InvalidOperationException("El promedio académico debe estar entre 0 y 5.");
            }
           
            var carnetExistente =
            await _estudianteRepository.GetByCarnetAsync(estudiante.Carnet);

            if (carnetExistente != null)
            {
                throw new InvalidOperationException(
                    "Ya existe un estudiante con ese carnet.");
            }
            var documentoExistente =
             await _estudianteRepository.GetByDocumentoAsync(
             estudiante.DocumentoIdentidad);

            if (documentoExistente != null)
            {
                throw new InvalidOperationException(
                    "Ya existe un estudiante con ese documento.");
            }
            await _unitOfWork.BeginTransactionAsync();

            try
            {
                estudiante.Id = Guid.NewGuid();
                var usuario = new Usuario
                {
                    Id = Guid.NewGuid(),
                    Login = estudiante.Correo,
                    PasswordHash = _hasherService.HashPassword(estudiante.DocumentoIdentidad),
                    Rol = RolUsuario.Estudiante
                };
                estudiante.UsuarioId = usuario.Id;
                var perfilProfesional = new PerfilProfesional
                {
                    Id = Guid.NewGuid(),
                    EstudianteId = estudiante.Id,
                    Descripcion = "Perfil profesional de " + estudiante.Nombre
                };
                await _usuarioRepository.CreateAsync(usuario);
                await _estudianteRepository.CreateAsync(estudiante);
                await _perfilProfesionalRepository.CreateAsync(perfilProfesional);


                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitAsync();
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
            
        public async Task UpdateAsync(Estudiante usuario)
        {
            var existingUsuario = await _estudianteRepository.GetByIdAsync(usuario.Id);
            if (existingUsuario == null)
            {
                throw new KeyNotFoundException($"No se encontró el estudiante con ID: {usuario.Id}");
            }
            existingUsuario.Nombre = usuario.Nombre;
            existingUsuario.Correo = usuario.Correo;
            existingUsuario.Telefono = usuario.Telefono;
            existingUsuario.Carrera = usuario.Carrera;
            existingUsuario.Facultad = usuario.Facultad;
            existingUsuario.CreditosAprobados = usuario.CreditosAprobados;
            existingUsuario.PromedioAcademico = usuario.PromedioAcademico;
            await _estudianteRepository.UpdateAsync(existingUsuario);
        }
        public async Task DeleteAsync(Guid id)
        {
            var existingUsuario = await _estudianteRepository.GetByIdAsync(id);
            if (existingUsuario == null)
            {
                throw new KeyNotFoundException($"No se encontró el estudiante con ID: {id}");
            }
            await _estudianteRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Estudiante>> BuscarPerfilesAsync(
        string? textoBusqueda,
        string? carrera)
        {
            return await _estudianteRepository.BuscarPerfilesAsync(
                textoBusqueda,
                carrera);
        }

    }
}
