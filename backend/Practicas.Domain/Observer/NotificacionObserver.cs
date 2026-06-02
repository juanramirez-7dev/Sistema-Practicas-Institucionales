using Practicas.Domain.Events;
using Practicas.Domain.Interfaces.Observer;
using Practicas.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Observer
{
    public class NotificacionObserver : IObserver
    {
        private readonly INotificacionService _notificacionService;

        public NotificacionObserver(INotificacionService notificacionService)
        {
            _notificacionService = notificacionService;
        }

        public async Task UpdateAsync(EstudianteSeleccionadoEvent evento)
        {
            var mensaje = $"{evento.NombreEmpresa} ha seleccionado tu perfil profesional.";

            await _notificacionService.CrearNotificacionAsync(
                evento.EstudianteId,
                mensaje);
        }
    }
}
