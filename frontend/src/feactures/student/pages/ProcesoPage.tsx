import { useState } from 'react';
import {
  IconCheck,
  IconClock,
  IconLock,
  IconInfoCircle,
  IconX,
} from '@tabler/icons-react';
import {
  ESTADOS_PROCESO,
  ACCIONES_PENDIENTES,
  type ProcesoEstado,
  type EstadoProceso,
} from '../../../lib/mockdata/estudiante.ts';

export function ProcesoPage() {
  const [selectedEstado, setSelectedEstado] = useState<ProcesoEstado | null>(null);
  const [showModal, setShowModal] = useState(false);

  const estadoActual = ESTADOS_PROCESO.find((e) => e.actual);
  const accionesPendientes = estadoActual
    ? ACCIONES_PENDIENTES[estadoActual.id as EstadoProceso]
    : [];

  const handleEstadoClick = (estado: ProcesoEstado) => {
    setSelectedEstado(estado);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEstado(null);
  };

  const getEstadoIcon = (estado: ProcesoEstado) => {
    if (estado.completado) {
      return (
        <IconCheck
          className="text-white"
          size={28}
        />
      );
    } else if (estado.actual) {
      return (
        <IconClock
          className="text-white"
          size={28}
        />
      );
    } else {
      return (
        <IconLock
          className="text-white/50"
          size={28}
        />
      );
    }
  };

  const getEstadoColor = (estado: ProcesoEstado) => {
    if (estado.completado) return 'var(--color-success)';
    if (estado.actual) return 'var(--color-secondary)';
    return 'var(--color-gray-medium)';
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ color: 'var(--color-primary)' }}>Mi Proceso de Prácticas</h1>
        <p style={{ color: 'var(--color-gray-medium)' }} className="mt-2">
          Visualiza el estado actual de tu proceso y las acciones pendientes para avanzar.
        </p>
      </div>

      {/* Ruta de estados */}
      <div
        className="p-8 rounded-2xl mb-8"
        style={{ backgroundColor: 'var(--color-white)' }}
      >
        <h2 className="mb-6" style={{ color: 'var(--color-text)' }}>
          Etapas del Proceso
        </h2>

        <div className="relative">
          {/* Línea de conexión */}
          <div className="hidden md:block absolute top-14 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full transition-all duration-500"
              style={{
                backgroundColor: 'var(--color-success)',
                width: `${(ESTADOS_PROCESO.filter((e) => e.completado).length / ESTADOS_PROCESO.length) * 100}%`,
              }}
            />
          </div>

          {/* Estados */}
          <div className="grid md:grid-cols-4 gap-6 md:gap-4 relative">
            {ESTADOS_PROCESO.map((estado) => (
              <div key={estado.id} className="flex flex-col items-center">
                {/* Icono del estado */}
                <button
                  onClick={() => handleEstadoClick(estado)}
                  className="w-28 h-28 rounded-full flex items-center justify-center mb-4 transition-all hover:scale-110 relative z-10"
                  style={{ backgroundColor: getEstadoColor(estado) }}
                >
                  {getEstadoIcon(estado)}
                </button>

                {/* Número y nombre */}
                <div className="text-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{
                      backgroundColor: getEstadoColor(estado),
                      color: 'white',
                    }}
                  >
                    <span className="font-bold text-sm">{estado.id}</span>
                  </div>
                  <h3
                    className="font-bold mb-1"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {estado.nombre}
                  </h3>
                  {estado.actual && (
                    <span
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: 'var(--color-secondary)',
                        color: 'white',
                      }}
                    >
                      Actual
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leyenda */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: 'var(--color-success)' }}
            />
            <span className="text-sm" style={{ color: 'var(--color-gray-medium)' }}>
              Completado
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            />
            <span className="text-sm" style={{ color: 'var(--color-gray-medium)' }}>
              En progreso
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: 'var(--color-gray-medium)' }}
            />
            <span className="text-sm" style={{ color: 'var(--color-gray-medium)' }}>
              Pendiente
            </span>
          </div>
        </div>
      </div>

      {/* Acciones pendientes */}
      <div
        className="p-8 rounded-2xl"
        style={{ backgroundColor: 'var(--color-white)' }}
      >
        <h2 className="mb-6" style={{ color: 'var(--color-text)' }}>
          Acciones Pendientes
        </h2>

        {accionesPendientes.length > 0 ? (
          <div className="space-y-4">
            {accionesPendientes.map((accion) => {
              const tipoColors = {
                documento: 'var(--color-secondary)',
                tarea: 'var(--color-accent)',
                revision: 'var(--color-warning)',
              };

              return (
                <div
                  key={accion.id}
                  className="p-6 rounded-xl border-2 flex items-start gap-4"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: tipoColors[accion.tipo] }}
                  >
                    <IconInfoCircle className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-bold mb-1"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {accion.titulo}
                    </h3>
                    <p style={{ color: 'var(--color-gray-medium)' }}>
                      {accion.descripcion}
                    </p>
                    <span
                      className="inline-block mt-2 text-xs px-3 py-1 rounded-full capitalize"
                      style={{
                        backgroundColor: `${tipoColors[accion.tipo]}20`,
                        color: tipoColors[accion.tipo],
                      }}
                    >
                      {accion.tipo}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="text-center py-12"
            style={{ color: 'var(--color-gray-medium)' }}
          >
            <p>No tienes acciones pendientes en este momento.</p>
          </div>
        )}
      </div>

      {/* Modal de detalle de estado */}
      {showModal && selectedEstado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="max-w-md w-full rounded-2xl p-8 relative"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4"
              style={{ color: 'var(--color-gray-medium)' }}
            >
              <IconX size={24} />
            </button>

            <div className="text-center mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: getEstadoColor(selectedEstado) }}
              >
                {getEstadoIcon(selectedEstado)}
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{
                  backgroundColor: getEstadoColor(selectedEstado),
                  color: 'white',
                }}
              >
                <span className="font-bold">{selectedEstado.id}</span>
              </div>
              <h2 style={{ color: 'var(--color-primary)' }}>
                {selectedEstado.nombre}
              </h2>
            </div>

            <p
              className="text-center mb-6"
              style={{ color: 'var(--color-gray-medium)' }}
            >
              {selectedEstado.descripcion}
            </p>

            <button
              onClick={closeModal}
              className="w-full px-6 py-3 rounded-xl text-white font-bold transition-all hover:scale-[1.02]"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
