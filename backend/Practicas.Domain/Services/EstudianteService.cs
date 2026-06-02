using Practicas.Domain.Entities;
using Practicas.Domain.Enums;
using Practicas.Domain.Interfaces.ExternalServices;
using Practicas.Domain.Interfaces.Repositories;
using Practicas.Domain.Interfaces.Services;
using Practicas.Domain.Interfaces.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Reflection.Metadata;
using System.Text;
using System.Xml.Linq;

namespace Practicas.Domain.Services
{
    public class EstudianteService : IEstudianteService
    {
        private readonly IEstudianteRepository _estudianteRepository;
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IHasherService _hasherService;
        private readonly IPerfilProfesionalRepository _perfilProfesionalRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEstudianteExternoService _estudianteAdapter;
        private readonly IHistorialAcademicoExternoService _historialAdapter;
        public EstudianteService(IEstudianteRepository estudianteRepository, IUsuarioRepository usuarioRepository, IHasherService hasherService, IUnitOfWork unitOfWork, IPerfilProfesionalRepository perfilProfesionalRepository,IEstudianteExternoService estudianteExternoService, IHistorialAcademicoExternoService historialAdapter)
        {
            _estudianteRepository = estudianteRepository;
            _hasherService = hasherService;
            _usuarioRepository = usuarioRepository;
            _unitOfWork = unitOfWork;
            _perfilProfesionalRepository = perfilProfesionalRepository;
            _estudianteAdapter = estudianteExternoService;
            _historialAdapter = historialAdapter;
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
        public async Task<Estudiante> GetExternalStudentAsync(string documento)
        {
            var estudiante = await _estudianteAdapter.ObtenerPorDocumentoAsync(documento);
            if (estudiante == null)
            {
                throw new KeyNotFoundException($"No se encontró el estudiante con documento: {documento}");
            }
            return estudiante;
        }
        public async Task<int> GetApprovedCreditsAsync(string documento)
        {
            var creditos = await _historialAdapter.ObtenerCreditosAprobadosAsync(documento);
            
            return creditos;
        }
        public async Task<Estudiante> CreateAsync(string document)
        {
            if (string.IsNullOrWhiteSpace(document))
            {
                throw new InvalidOperationException("El documento de identidad no puede estar vacío.");
            }
            var existingEstudiante = await _estudianteRepository.GetByDocumentoAsync(document);
            if (existingEstudiante != null)
            {
                throw new InvalidOperationException($"Ya existe un estudiante con documento: {document}");
            }
            var estudiante = await GetExternalStudentAsync(document);

            var approvedCredits = await GetApprovedCreditsAsync(document);

            if (approvedCredits < 60)
            {
                throw new InvalidOperationException(
                    $"El estudiante no cumple los requisitos. Tiene {approvedCredits} créditos aprobados y se requieren 60.");
            }

            await _unitOfWork.BeginTransactionAsync();

            try
            {
                estudiante.Id = Guid.NewGuid();
                estudiante.CreditosAprobados = approvedCredits;
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
                return estudiante;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }            
        public async Task UpdateAsync(string documento)
        {
            var usuario = await GetExternalStudentAsync(documento);
            var existingUsuario = await _estudianteRepository.GetByDocumentoAsync(documento);
            if (existingUsuario == null)
            {
                throw new KeyNotFoundException($"No se encontró el estudiante con Documento: {documento}");
            }
            existingUsuario.Nombre = usuario.Nombre;
            existingUsuario.Correo = usuario.Correo;
            existingUsuario.Telefono = usuario.Telefono;
            existingUsuario.Carrera = usuario.Carrera;
            existingUsuario.Facultad = usuario.Facultad;
            existingUsuario.CreditosAprobados = usuario.CreditosAprobados;
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
    }
}
