using Practicas.Domain.Entities;
using Practicas.Domain.Enums;
using Practicas.Domain.Interfaces.Repositories;
using Practicas.Domain.Interfaces.Services;
using Practicas.Domain.States.ConcreteStates;
using Practicas.Domain.States.Context;
using Practicas.Domain.States.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Services
{
    public class ProcesoService: IProcesoService
    {

        private readonly IProcesoRepository _procesoRepository;

        public ProcesoService(IProcesoRepository procesoRepository)
        {
            _procesoRepository = procesoRepository;
        }

        public async Task<Proceso> GetByEstudianteIdAsync(Guid estudianteId)
        {
            var proceso = await _procesoRepository.GetByEstudianteId(estudianteId);
            if (proceso == null)
            {
                throw new KeyNotFoundException("No se encontró un proceso para el estudiante especificado.");
            }
            return proceso;
        }
        public async Task CambioEstadoAsync(Guid procesoId)
        {
            var proceso = await _procesoRepository.GetByIdWithDocumentos(procesoId);
            if (proceso == null)
            {
                throw new KeyNotFoundException("No se encontró el proceso especificado.");
            }
            IEstadoProceso estadoActual;
            switch (proceso.Estado)
            {
                case EstadoProceso.Curso_Prepracticas:
                    estadoActual = new CursoPrepracticasState();
                    break;
                case EstadoProceso.Documentacion:
                    estadoActual = new DocumentacionState();
                    break;
                default:
                    throw new InvalidOperationException($"Estado no soportado: {proceso.Estado}");
            }

            var estadoContext = new EstadoProcesoContext(estadoActual);
            if (estadoContext.PuedeAvanzar(proceso))
            {
                proceso.Estado = estadoContext.ObtenerSiguienteEstado();
                await _procesoRepository.UpdateAsync(proceso);
            }

        }
    }
}
