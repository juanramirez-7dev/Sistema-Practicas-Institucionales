using Practicas.Domain.Entities;
using Practicas.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Services
{
    public interface IDocumentoService
    {
        Task<IEnumerable<Documento>> GetByEstudianteIdAsync(Guid estudianteId);
        Task<Documento> GetByIdAsync(Guid id);
        Task<Documento> CreateAsync(Guid estudianteId, Stream stream, string extension,  TipoDocumento tipo);
        Task UpdateByTipoAsync(Guid id, Stream stream, string extension);   
        Task AceptarAsync(Guid id);
        Task RechazarAsync(Guid id, string observacion);

    }
}
