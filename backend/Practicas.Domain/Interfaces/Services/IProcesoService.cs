using Practicas.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Practicas.Domain.Interfaces.Services
{
    public interface IProcesoService
    {
        Task<Proceso> GetByEstudianteIdAsync(Guid estudianteId);
        Task CambioEstadoAsync(Guid procesoId);
    }
}
