using Practicas.Domain.Entities;

namespace Practicas.Domain.Interfaces.ExternalServices;

public interface IEstudianteExternoService
{
    Task<Estudiante?> ObtenerPorDocumentoAsync(string documento);
}