using Practicas.Domain.Interfaces.ExternalServices;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.DataAccess.ExternalServices
{
    public class HistorialAcademicoApiAdapter : IHistorialAcademicoExternoService
    {
        private readonly HistorialAcademicoApiClient _apiClient;
        public HistorialAcademicoApiAdapter(HistorialAcademicoApiClient apiClient)
        {
            _apiClient = apiClient;
        }
        public async Task<int> ObtenerCreditosAprobadosAsync(string documento)
        {
            var historial = await _apiClient.ObtenerHistorialAsync(documento);
            return historial.Sum(x => x.CreditosAprobados);
        }
    }
}
