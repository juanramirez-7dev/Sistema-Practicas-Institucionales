import {
  IconUser,
  IconMail,
  IconPhone,
  IconBriefcase,
  IconClock,
  IconUsers,
} from '@tabler/icons-react';
import { ESTUDIANTES_ASIGNADOS } from '../../lib/mockdata/asesor.ts';

export function GestionPage() {
  const getEstadoColor = (estadoProceso: number) => {
    switch (estadoProceso) {
      case 1:
        return 'var(--color-success)';
      case 2:
      case 3:
        return 'var(--color-warning)';
      case 4:
        return 'var(--color-success)';
      default:
        return 'var(--color-gray-medium)';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ color: 'var(--color-primary)' }}>
          Gestión de Estudiantes
        </h1>
        <p style={{ color: 'var(--color-gray-medium)' }} className="mt-2">
          Estudiantes asignados bajo tu asesoría de prácticas profesionales
        </p>
      </div>

      {/* Resumen */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div
          className="p-6 rounded-2xl"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              <IconUsers className="text-white" size={28} />
            </div>
            <div>
              <p
                className="text-sm"
                style={{ color: 'var(--color-gray-medium)' }}
              >
                Total Asignados
              </p>
              <p
                className="text-3xl font-bold"
                style={{ color: 'var(--color-primary)' }}
              >
                {ESTUDIANTES_ASIGNADOS.length}
              </p>
            </div>
          </div>
        </div>

        <div
          className="p-6 rounded-2xl"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-warning)' }}
            >
              <IconClock className="text-white" size={28} />
            </div>
            <div>
              <p
                className="text-sm"
                style={{ color: 'var(--color-gray-medium)' }}
              >
                En Proceso
              </p>
              <p
                className="text-3xl font-bold"
                style={{ color: 'var(--color-warning)' }}
              >
                {
                  ESTUDIANTES_ASIGNADOS.filter(
                    (e) => e.estadoProceso === 2 || e.estadoProceso === 3
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        <div
          className="p-6 rounded-2xl"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-success)' }}
            >
              <IconBriefcase className="text-white" size={28} />
            </div>
            <div>
              <p
                className="text-sm"
                style={{ color: 'var(--color-gray-medium)' }}
              >
                Con Empresa
              </p>
              <p
                className="text-3xl font-bold"
                style={{ color: 'var(--color-success)' }}
              >
                {ESTUDIANTES_ASIGNADOS.filter((e) => e.empresaAsignada).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de estudiantes */}
      <div className="space-y-6">
        {ESTUDIANTES_ASIGNADOS.map((estudiante) => (
          <div
            key={estudiante.id}
            className="p-6 rounded-2xl border-2"
            style={{
              backgroundColor: 'var(--color-white)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--color-gray-light)' }}
              >
                <IconUser size={32} style={{ color: 'var(--color-gray-medium)' }} />
              </div>

              {/* Información */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h2 style={{ color: 'var(--color-primary)' }}>
                      {estudiante.nombre}
                    </h2>
                    <p
                      className="text-sm mt-1"
                      style={{ color: 'var(--color-gray-medium)' }}
                    >
                      {estudiante.programa} • Semestre {estudiante.semestre}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--color-gray-medium)' }}
                    >
                      Documento: {estudiante.documento}
                    </p>
                  </div>

                  <div
                    className="px-4 py-2 rounded-lg"
                    style={{
                      backgroundColor: `${getEstadoColor(estudiante.estadoProceso)}20`,
                      color: getEstadoColor(estudiante.estadoProceso),
                    }}
                  >
                    <p className="font-bold text-sm">{estudiante.estadoNombre}</p>
                  </div>
                </div>

                {/* Información académica */}
                <div
                  className="p-4 rounded-xl mb-4"
                  style={{ backgroundColor: 'var(--color-gray-light)' }}
                >
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p
                        className="text-xs font-bold"
                        style={{ color: 'var(--color-gray-medium)' }}
                      >
                        Promedio
                      </p>
                      <p
                        className="font-bold"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {estudiante.promedio.toFixed(1)}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-xs font-bold"
                        style={{ color: 'var(--color-gray-medium)' }}
                      >
                        Fecha Asignación
                      </p>
                      <p
                        className="font-bold"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {new Date(estudiante.fechaAsignacion).toLocaleDateString(
                          'es-CO',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )}
                      </p>
                    </div>
                    {estudiante.empresaAsignada && (
                      <div>
                        <p
                          className="text-xs font-bold"
                          style={{ color: 'var(--color-gray-medium)' }}
                        >
                          Empresa
                        </p>
                        <p
                          className="font-bold"
                          style={{ color: 'var(--color-text)' }}
                        >
                          {estudiante.empresaAsignada}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contacto */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`mailto:${estudiante.email}`}
                    className="flex items-center gap-2 text-sm hover:underline"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    <IconMail size={16} />
                    {estudiante.email}
                  </a>
                  <a
                    href={`tel:${estudiante.telefono}`}
                    className="flex items-center gap-2 text-sm hover:underline"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    <IconPhone size={16} />
                    {estudiante.telefono}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
