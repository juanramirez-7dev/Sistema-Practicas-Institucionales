using Practicas.Domain.Entities;
using Practicas.Domain.Enums;
using Practicas.Domain.States.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.States.ConcreteStates
{
    public class CursoPrepracticasState : IEstadoProceso
    {

        public bool PuedeAvanzar(Proceso proceso)
        {

            var documentos = proceso.Documentos;
            bool existsCertificadoPrepracticas = documentos.Any(d => d.Tipo == TipoDocumento.Certificado_Prepracticas && d.Estado == EstadoDocumento.Aprobado);

            if (existsCertificadoPrepracticas)
            {
                return true;
            }
            return false;
        }   
        public EstadoProceso ObtenerSiguienteEstado()
        {
            return EstadoProceso.Documentacion;
        }
    }
}
