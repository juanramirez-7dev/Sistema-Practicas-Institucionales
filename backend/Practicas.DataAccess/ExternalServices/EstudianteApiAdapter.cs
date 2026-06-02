using Practicas.Domain.Entities;
using Practicas.Domain.Interfaces.ExternalServices;

namespace Practicas.DataAccess.ExternalServices;

public class EstudianteApiAdapter : IEstudianteExternoService
{
    private readonly EstudianteApiClient _estudianteClient;

    public EstudianteApiAdapter(EstudianteApiClient estudianteClient)
    {
        _estudianteClient = estudianteClient;
    }

    public async Task<Estudiante?> ObtenerPorDocumentoAsync(string documento)
    {
        var externalStudent = await _estudianteClient.ObtenerPorDocumentoAsync(documento);

        if (externalStudent == null)
        {
            return null;
        }

        return new Estudiante
        {
            Carnet = int.Parse(externalStudent.CodigoEstudiantil),

            DocumentoIdentidad = externalStudent.NumeroDocumento,

            Nombre = $"{externalStudent.Nombres} " + $"{externalStudent.Apellidos}",

            Correo = externalStudent.CorreoInstitucional,

            Telefono = externalStudent.Telefono,

            Carrera = externalStudent.Programa.Nombre,

            Facultad = externalStudent.Programa.Facultad.Nombre,

            CreditosAprobados = 0
        };
    }
}