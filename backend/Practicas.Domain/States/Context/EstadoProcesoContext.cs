using Practicas.Domain.Entities;
using Practicas.Domain.Enums;
using Practicas.Domain.States.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.States.Context
{
    public class EstadoProcesoContext
    {
        private IEstadoProceso _estadoActual;

        public EstadoProcesoContext(IEstadoProceso estadoActual)
        {
            _estadoActual = estadoActual;
        }

        public void CambiarEstado(IEstadoProceso nuevoEstado)
        {
            _estadoActual = nuevoEstado;
        }

        public bool PuedeAvanzar(Proceso proceso)
        {
            return _estadoActual.PuedeAvanzar(proceso);
        }

        public EstadoProceso ObtenerSiguienteEstado()
        {
            return _estadoActual.ObtenerSiguienteEstado();
        }
    }
}
