using Practicas.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Repositories
{
    public interface INotificacionRepository
    {

        Task CreateAsync(Notificacion notificacion);

        Task<IEnumerable<Notificacion>> GetByEstudianteIdAsync(
            Guid estudianteId);

        Task<Notificacion?> GetByIdAsync(Guid id);

        Task UpdateAsync(Notificacion notificacion);
    }
}
