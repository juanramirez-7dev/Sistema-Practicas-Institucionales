using Practicas.Domain.Events;
using Practicas.Domain.Interfaces.Observer;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.Observer
{
    public class EstudianteSeleccionadoSubject : ISubject
    {
        private readonly List<IObserver> _observers = new();

        private EstudianteSeleccionadoEvent? _evento;

        public void SetEvento(
            EstudianteSeleccionadoEvent evento)
        {
            _evento = evento;
        }

        public void Attach(IObserver observer)
        {
            _observers.Add(observer);
        }

        public void Detach(IObserver observer)
        {
            _observers.Remove(observer);
        }

        public async Task NotifyAsync()
        {
            if (_evento == null)
                return;

            foreach (var observer in _observers)
            {
                await observer.UpdateAsync(_evento);
            }
        }
    }
}
