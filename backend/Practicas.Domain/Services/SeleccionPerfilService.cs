using Org.BouncyCastle.Asn1.Crmf;
using Practicas.Domain.Entities;
using Practicas.Domain.Events;
using Practicas.Domain.Interfaces.Observer;
using Practicas.Domain.Interfaces.Repositories;
using Practicas.Domain.Interfaces.Services;
using Practicas.Domain.Interfaces.UnitOfWork;
using Practicas.Domain.Observer;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Services
{
    public class SeleccionPerfilService: ISeleccionPerfilService
    {
        private readonly ISeleccionPerfilRepository _repository;
        private readonly IEmpresaRepository _empresaRepository;
        private readonly IEstudianteRepository _estudianteRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IObserver _observer;
        private readonly ISubject _subject;

        public SeleccionPerfilService(
            ISeleccionPerfilRepository repository,
            IEmpresaRepository empresaRepository,
            IEstudianteRepository estudianteRepository,
            IUnitOfWork unitOfWork,
            IObserver observer,
            ISubject subject)
        {
            _repository = repository;
            _empresaRepository = empresaRepository;
            _estudianteRepository = estudianteRepository;
            _unitOfWork = unitOfWork;
            _observer = observer;
            _subject = subject;
        }

        public async Task<SeleccionPerfil> SeleccionarEstudianteAsync(Guid empresaId, Guid estudianteId)
        {
            var empresa = await _empresaRepository.GetByIdAsync(empresaId);
            if (empresa == null)
                throw new KeyNotFoundException($"No se encontró la empresa con ID: {empresaId}");

            var estudiante = await _estudianteRepository.GetByIdAsync(estudianteId);
            if (estudiante == null)
                throw new KeyNotFoundException($"No se encontró el estudiante con ID: {estudianteId}");

            SeleccionPerfil seleccion;

            var seleccionExistente =
                await _repository.GetByEmpresaYEstudianteAsync(empresaId, estudianteId);

            if (seleccionExistente != null)
            {
                if (seleccionExistente.Activo)
                    throw new InvalidOperationException("La empresa ya seleccionó este estudiante.");

                seleccionExistente.Activo = true;
                seleccionExistente.FechaSeleccion = DateTime.UtcNow;

                await _repository.UpdateAsync(seleccionExistente);

                seleccion = seleccionExistente;
            }
            else
            {
                seleccion = new SeleccionPerfil
                {
                    Id = Guid.NewGuid(),
                    EmpresaId = empresaId,
                    EstudianteId = estudianteId,
                    FechaSeleccion = DateTime.UtcNow,
                    Activo = true
                };

                await _repository.CreateAsync(seleccion);
            }

            _subject.Attach(_observer);

            _subject.SetEvento(new EstudianteSeleccionadoEvent
            {
                EmpresaId = empresaId,
                EstudianteId = estudianteId,
                NombreEmpresa = empresa.RazonSocial,
                FechaSeleccion = DateTime.UtcNow
            });

            await _subject.NotifyAsync();
            _subject.Detach(_observer);

            await _unitOfWork.SaveChangesAsync();

            return await _repository.GetByEmpresaYEstudianteAsync(empresaId,estudianteId)
            ?? throw new InvalidOperationException("No se pudo recuperar la selección creada.");
        }

        public async Task<IEnumerable<SeleccionPerfil>> GetByEmpresaIdAsync(Guid empresaId)
        {
            return await _repository.GetByEmpresaIdAsync(empresaId);
        }
        public async Task DesactivarSeleccionAsync(Guid seleccionId)
        {
            var seleccion = await _repository.GetByIdAsync(seleccionId);

            if (seleccion == null)
                throw new KeyNotFoundException($"No se encontró la selección con ID: {seleccionId}");

            seleccion.Activo = false;

            await _repository.UpdateAsync(seleccion);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<SeleccionPerfil>> GetByEstudianteIdAsync(Guid estudianteId)

        {
            var estudiante = await _estudianteRepository.GetByIdAsync(estudianteId);
            if (estudiante == null)
                throw new KeyNotFoundException($"No se encontró el estudiante con ID: {estudianteId}");
            var selecciones =
                await _repository.GetByEstudianteIdAsync(estudianteId);

            if (!selecciones.Any())
                return Enumerable.Empty<SeleccionPerfil>();

            return selecciones;
        }
    }
}

