using Practicas.Domain.Events;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Observer
{
    public interface IObserver
    {
        Task UpdateAsync(
            EstudianteSeleccionadoEvent evento);
    }
}

