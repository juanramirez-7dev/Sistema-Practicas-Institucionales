using Practicas.Domain.Entities;
using Practicas.Domain.Enums;
using Practicas.Domain.Interfaces.Repositories;
using Practicas.Domain.Interfaces.Services;
using Practicas.Domain.Interfaces.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Services
{
    public class DocumentoService : IDocumentoService
    {
       private readonly ISaveFileService _saveFileService;
        private readonly IDocumentoRepository _documentoRepository;
        private readonly IProcesoRepository _procesoRepository;
        private readonly IEstudianteRepository _estudianteRepository;
        private readonly IProcesoService _procesoService;


        public DocumentoService(
            ISaveFileService saveFileService,
            IDocumentoRepository documentoRepository,
            IProcesoRepository procesoRepository,
            IEstudianteRepository estudianteRepository,
            IProcesoService procesoService)
        {
            _saveFileService = saveFileService;
            _documentoRepository = documentoRepository;
            _procesoRepository = procesoRepository;
            _estudianteRepository = estudianteRepository;
            _procesoService = procesoService;
        }

        public async Task<IEnumerable<Documento>> GetByEstudianteIdAsync(Guid estudianteId)
        {
            var estudiante = await _estudianteRepository.GetByIdAsync(estudianteId);
            if (estudiante == null)
            {
                throw new KeyNotFoundException("Estudiante No encontrado");
            }
            var proceso = await _procesoRepository.GetByEstudianteId(estudiante.Id);
            if (proceso == null)
            {
                throw new KeyNotFoundException("Proceso No encontrado");
            }

            return await _documentoRepository.GetByProcesoIdAsync(proceso.Id);
        }
        public async Task<Documento> GetByIdAsync(Guid id)
        {
            var documento = await _documentoRepository.GetByIdAsync(id);
            if (documento == null)
            {
                throw new KeyNotFoundException("Documento No encontrado");
            }
            return documento;
        }
        public async Task<Documento> CreateAsync(Guid estudianteId, Stream stream, string extension, TipoDocumento tipo)
        {
            var estudiante = await _estudianteRepository.GetByIdAsync(estudianteId);
            if (estudiante == null)
            {
                throw new KeyNotFoundException("Estudiante No encontrado");
            }
            var proceso = await _procesoRepository.GetByEstudianteId(estudiante.Id);
            if (proceso == null)
            {
                throw new KeyNotFoundException("Proceso No encontrado");
            }
            if (await _documentoRepository.ExistByTipoInProceso(proceso.Id, tipo))
            {
                throw new InvalidOperationException("Documento del mismo tipo ya existe en el proceso");
            }
            string url = await _saveFileService.SaveFileAsync(stream, extension);
            var documento = new Documento
            {
                Id = Guid.NewGuid(),
                Estado = EstadoDocumento.Pendiente,
                Tipo = tipo,
                Url = url,
                FechaCarga = DateTime.UtcNow,
                ProcesoId = proceso.Id
            };
            await _documentoRepository.CreateAsync(documento);
            return documento;
        }
        public async Task UpdateByTipoAsync(Guid id, Stream stream, string extension)
        {
            var existingDocumento = await _documentoRepository.GetByIdAsync(id);
            if (existingDocumento == null)
            {
                throw new KeyNotFoundException("Documento No encontrado");
            }
            bool deleted = await _saveFileService.RemoveFileAsync(existingDocumento.Url);
            if (!deleted)
            {
                throw new InvalidOperationException("No se pudo eliminar el archivo anterior");
            }
            string url = await _saveFileService.SaveFileAsync(stream, extension);
            existingDocumento.Url = url;
            existingDocumento.Estado = EstadoDocumento.Pendiente;
            existingDocumento.FechaCarga = DateTime.UtcNow;
            await _documentoRepository.UpdateAsync(existingDocumento);
        }

        public async Task AceptarAsync(Guid id)
        {
            var documento = await _documentoRepository.GetByIdAsync(id);
            if (documento == null)
            {
                throw new KeyNotFoundException("Documento No encontrado");
            }
            documento.Estado = EstadoDocumento.Aprobado;
            await _documentoRepository.UpdateAsync(documento);
            await _procesoService.CambioEstadoAsync(documento.ProcesoId);
        }
        public async Task RechazarAsync(Guid id, string observacion)
        {
            var documento = await _documentoRepository.GetByIdAsync(id);
            if (documento == null)
            {
                throw new KeyNotFoundException("Documento No encontrado");
            }
            documento.Estado = EstadoDocumento.Rechazado;
            documento.Observacion = observacion;
            await _documentoRepository.UpdateAsync(documento);
        }

        public async Task<Documento?> GetHojaVidaByEstudianteIdAsync(
        Guid estudianteId)
        {
            return await _documentoRepository
                .GetHojaVidaByEstudianteIdAsync(estudianteId);
        }
    }
}
