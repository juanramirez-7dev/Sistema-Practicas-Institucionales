using Practicas.Domain.Events;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Interfaces.Observer
{
    public interface ISubject
    {
        void Attach(IObserver observer);

        void Detach(IObserver observer);

        Task NotifyAsync();

        void SetEvento(EstudianteSeleccionadoEvent evento);
    }
}
