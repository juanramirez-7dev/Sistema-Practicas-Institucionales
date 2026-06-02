using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.DataAccess.ExternalServices.Models;

public class ExternalStudentResponse
{
    public int EstudianteId { get; set; }

    public int ProgramaId { get; set; }

    public string CodigoEstudiantil { get; set; } = string.Empty;

    public string TipoDocumento { get; set; } = string.Empty;

    public string NumeroDocumento { get; set; } = string.Empty;

    public string Nombres { get; set; } = string.Empty;

    public string Apellidos { get; set; } = string.Empty;

    public string CorreoInstitucional { get; set; } = string.Empty;

    public string Telefono { get; set; } = string.Empty;

    public DateTime FechaIngreso { get; set; }

    public int Estado { get; set; }

    public ExternalProgramResponse Programa { get; set; } = null!;
}
