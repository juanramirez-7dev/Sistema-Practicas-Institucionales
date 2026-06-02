using System.Text.Json;
using Practicas.DataAccess.ExternalServices.Models;

namespace Practicas.DataAccess.ExternalServices;

public class EstudianteApiClient
{
    private readonly HttpClient _httpClient;

    public EstudianteApiClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<ExternalStudentResponse?>
        ObtenerPorDocumentoAsync(string documento)
    {
        var response = await _httpClient.GetAsync($"api/Estudiante/Document/{documento}");

        if (!response.IsSuccessStatusCode)
        {
            return null;
        }

        var json = await response.Content.ReadAsStringAsync();

        return JsonSerializer.Deserialize<
            ExternalStudentResponse>(
            json,
            new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
    }
}