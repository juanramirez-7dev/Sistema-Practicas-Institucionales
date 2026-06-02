using Practicas.Domain.Entities;
using Practicas.Domain.Interfaces.Repositories;
using Practicas.Domain.Interfaces.Services;
using Practicas.Domain.Interfaces.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Services
{
    public class NotificacionService:INotificacionService
    {

        private readonly INotificacionRepository _repository;
        private readonly IUnitOfWork _unitOfWork;

        public NotificacionService(
            INotificacionRepository repository,
            IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public async Task CrearNotificacionAsync(
            Guid estudianteId,
            string mensaje)
        {
            var notificacion = new Notificacion
            {
                Id = Guid.NewGuid(),
                EstudianteId = estudianteId,
                Mensaje = mensaje,
                FechaCreacion = DateTime.UtcNow,
                Leida = false
            };

            await _repository.CreateAsync(notificacion);

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<Notificacion>>
            ObtenerPorEstudianteAsync(Guid estudianteId)
        {
            return await _repository
                .GetByEstudianteIdAsync(estudianteId);
        }

        public async Task MarcarComoLeidaAsync(
            Guid notificacionId)
        {
            var notificacion =
                await _repository.GetByIdAsync(notificacionId);

            if (notificacion == null)
                throw new KeyNotFoundException();

            notificacion.Leida = true;

            await _repository.UpdateAsync(notificacion);

            await _unitOfWork.SaveChangesAsync();
        }
    }
}

