using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.ExternalServices
{
    public interface IHistorialAcademicoExternoService
    {
        Task<int> ObtenerCreditosAprobadosAsync(string documento);
    }
}
