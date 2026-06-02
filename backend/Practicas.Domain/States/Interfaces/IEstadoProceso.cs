using Practicas.Domain.Entities;
using Practicas.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.States.Interfaces
{
    public interface IEstadoProceso
    {
        bool PuedeAvanzar(Proceso proceso);
        EstadoProceso ObtenerSiguienteEstado();
    }
}
