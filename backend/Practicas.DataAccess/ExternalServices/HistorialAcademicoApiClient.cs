using Practicas.DataAccess.ExternalServices.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace Practicas.DataAccess.ExternalServices
{
    using System.Net;

    public class HistorialAcademicoApiClient
    {
        private readonly HttpClient _httpClient;

        public HistorialAcademicoApiClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<ExternalHistorialResponse>> ObtenerHistorialAsync(string documento)
        {
            var response = await _httpClient.GetAsync(
                $"api/HistorialAcademico/Document/{documento}/HistorialAcademico");

            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                throw new KeyNotFoundException(
                    $"No se encontro al estudiante con documento: {documento}");
            }

            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<List<ExternalHistorialResponse>>(
                json,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                })!;
        }
    }
}

