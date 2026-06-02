using Practicas.Domain.Entities;
using Practicas.Domain.Enums;
using Practicas.Domain.Interfaces.Repositories;
using Practicas.Domain.Interfaces.Services;
using Practicas.Domain.Interfaces.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;

namespace Practicas.Domain.Services
{
    public class EmpresaService:IEmpresaService
    {
        private readonly IEmpresaRepository _empresaRepository;
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IHasherService _hasherService;
        private readonly IUnitOfWork _unitOfWork;

        public EmpresaService(
            IEmpresaRepository empresaRepository,
            IUsuarioRepository usuarioRepository,
            IHasherService hasherService,
            IUnitOfWork unitOfWork)
        {
            _empresaRepository = empresaRepository;
            _usuarioRepository = usuarioRepository;
            _hasherService = hasherService;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Empresa>> GetAllAsync()
        {
            return await _empresaRepository.GetAllAsync();
        }

        public async Task<Empresa> GetByIdAsync(Guid id)
        {
            var empresa = await _empresaRepository.GetByIdAsync(id);

            if (empresa == null)
            {
                throw new KeyNotFoundException($"No se encontró la empresa con ID: {id}");
            }

            return empresa;
        }

        public async Task<Empresa> GetByNitAsync(string nit)
        {
            if (string.IsNullOrWhiteSpace(nit))
            {
                throw new InvalidOperationException("El NIT no puede estar vacío.");
            }

            var empresa = await _empresaRepository.GetByNitAsync(nit);

            if (empresa == null)
            {
                throw new KeyNotFoundException($"No se encontró la empresa con NIT: {nit}");
            }

            return empresa;
        }

        public async Task<Empresa> GetByCorreoAsync(string correo)
        {
            if (string.IsNullOrWhiteSpace(correo))
            {
                throw new InvalidOperationException("El correo electrónico no puede estar vacío.");
            }

            try
            {
                _ = new MailAddress(correo);
            }
            catch
            {
                throw new InvalidOperationException("El correo electrónico no es válido.");
            }

            var empresa = await _empresaRepository.GetByCorreoAsync(correo);

            if (empresa == null)
            {
                throw new KeyNotFoundException($"No se encontró la empresa con correo: {correo}");
            }

            return empresa;
        }

        public async Task<Empresa> CreateAsync(Empresa empresa)
        {
            if (empresa == null)
            {
                throw new InvalidOperationException("La empresa no puede ser nula.");
            }

            if (string.IsNullOrWhiteSpace(empresa.Nit))
            {
                throw new InvalidOperationException("El NIT es obligatorio.");
            }

            if (string.IsNullOrWhiteSpace(empresa.RazonSocial))
            {
                throw new InvalidOperationException("La razón social es obligatoria.");
            }

            if (string.IsNullOrWhiteSpace(empresa.Correo))
            {
                throw new InvalidOperationException("El correo electrónico es obligatorio.");
            }

            if (string.IsNullOrWhiteSpace(empresa.Telefono))
            {
                throw new InvalidOperationException("El teléfono es obligatorio.");
            }

            try
            {
                _ = new MailAddress(empresa.Correo);
            }
            catch
            {
                throw new InvalidOperationException("El correo electrónico no es válido.");
            }

            var nitExistente = await _empresaRepository.GetByNitAsync(empresa.Nit);
            if (nitExistente != null)
            {
                throw new InvalidOperationException("Ya existe una empresa con ese NIT.");
            }

            var correoExistente = await _empresaRepository.GetByCorreoAsync(empresa.Correo);
            if (correoExistente != null)
            {
                throw new InvalidOperationException("Ya existe una empresa con ese correo.");
            }

            await _unitOfWork.BeginTransactionAsync();

            try
            {
                empresa.Id = Guid.NewGuid();

                var usuario = new Usuario
                {
                    Id = Guid.NewGuid(),
                    Login = empresa.Correo,
                    PasswordHash = _hasherService.HashPassword(empresa.Nit),
                    Rol = RolUsuario.Empresa
                };

                empresa.UsuarioId = usuario.Id;


                await _usuarioRepository.CreateAsync(usuario);
                await _empresaRepository.CreateAsync(empresa);

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitAsync();
                return empresa;
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }

        public async Task UpdateAsync(Empresa empresa)
        {
            if (empresa == null)
            {
                throw new InvalidOperationException("La empresa no puede ser nula.");
            }

            if (string.IsNullOrWhiteSpace(empresa.Nit))
            {
                throw new InvalidOperationException("El NIT es obligatorio.");
            }

            if (string.IsNullOrWhiteSpace(empresa.RazonSocial))
            {
                throw new InvalidOperationException("La razón social es obligatoria.");
            }

            if (string.IsNullOrWhiteSpace(empresa.Correo))
            {
                throw new InvalidOperationException("El correo electrónico es obligatorio.");
            }

            if (string.IsNullOrWhiteSpace(empresa.Telefono))
            {
                throw new InvalidOperationException("El teléfono es obligatorio.");
            }

            try
            {
                _ = new MailAddress(empresa.Correo);
            }
            catch
            {
                throw new InvalidOperationException("El correo electrónico no es válido.");
            }

            var existingEmpresa = await _empresaRepository.GetByIdAsync(empresa.Id);

            if (existingEmpresa == null)
            {
                throw new KeyNotFoundException($"No se encontró la empresa con ID: {empresa.Id}");
            }

            var nitExistente = await _empresaRepository.GetByNitAsync(empresa.Nit);
            if (nitExistente != null && nitExistente.Id != empresa.Id)
            {
                throw new InvalidOperationException("Ya existe otra empresa con ese NIT.");
            }

            var correoExistente = await _empresaRepository.GetByCorreoAsync(empresa.Correo);
            if (correoExistente != null && correoExistente.Id != empresa.Id)
            {
                throw new InvalidOperationException("Ya existe otra empresa con ese correo.");
            }

            await _unitOfWork.BeginTransactionAsync();

            try
            {
                existingEmpresa.Nit = empresa.Nit;
                existingEmpresa.Correo = empresa.Correo;
                existingEmpresa.Telefono = empresa.Telefono;
                existingEmpresa.Direccion = empresa.Direccion;
                existingEmpresa.RazonSocial = empresa.RazonSocial;
                existingEmpresa.Sector = empresa.Sector;
                existingEmpresa.SitioWeb = empresa.SitioWeb;

                if (existingEmpresa.Usuario != null)
                {
                    existingEmpresa.Usuario.Login = empresa.Correo;
                    await _usuarioRepository.UpdateAsync(existingEmpresa.Usuario);
                }

                await _empresaRepository.UpdateAsync(existingEmpresa);

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitAsync();
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }

        public async Task DeleteAsync(Guid id)
        {
            var existingEmpresa = await _empresaRepository.GetByIdAsync(id);

            if (existingEmpresa == null)
            {
                throw new KeyNotFoundException($"No se encontró la empresa con ID: {id}");
            }

            await _unitOfWork.BeginTransactionAsync();

            try
            {
                await _empresaRepository.DeleteAsync(id);

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitAsync();
            }
            catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}


    

