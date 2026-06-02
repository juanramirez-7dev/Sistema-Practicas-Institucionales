using Practicas.Domain.Entities;
using Practicas.Domain.Enums;
using Practicas.Domain.States.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Practicas.Domain.States.ConcreteStates
{
    public class DocumentacionState: IEstadoProceso
    {
        public bool PuedeAvanzar(Proceso proceso)
        {
            var documentos = proceso.Documentos;
            bool existsHojaDeVida = documentos.Any(d => d.Tipo == TipoDocumento.Hoda_De_Vida && d.Estado == EstadoDocumento.Aprobado);
            bool existsCompromisoAcademico = documentos.Any(d => d.Tipo == TipoDocumento.Compromiso_Academico && d.Estado == EstadoDocumento.Aprobado);

            if (existsHojaDeVida && existsCompromisoAcademico)
            {
                return true;
            }
            return false;
        }
        public EstadoProceso ObtenerSiguienteEstado()
        {
            return EstadoProceso.Visible_Para_Empresas;
        }
    }
}
