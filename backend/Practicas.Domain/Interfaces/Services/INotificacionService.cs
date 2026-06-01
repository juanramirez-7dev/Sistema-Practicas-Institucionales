using Practicas.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Services
{
    public interface INotificacionService
    {
        Task CrearNotificacionAsync(Guid estudianteId, string mensaje);
       

        Task<IEnumerable<Notificacion>>
            ObtenerPorEstudianteAsync(Guid estudianteId);

        Task MarcarComoLeidaAsync(Guid notificacionId);
    }
}
