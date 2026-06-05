import { useState } from 'react';
import {
  IconCheck,
  IconClock,
  IconLock,
  IconInfoCircle,
  IconX,
  IconLoader,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

import { estudianteService } from '../../services/estudianteService';
import type {
  AccionPendiente,
  ProcesoBackendState,
  ProcesoResponse,
  ProcesoStep,
} from '../../types/estudianteTypes';

const PROCESO_STEPS: ProcesoStep[] = [
  {
    id: 1,
    estado: 'Requisitos_Minimos',
    nombre: 'Requisitos Mínimos',
    descripcion:
      'Validación de créditos y condiciones iniciales para poder comenzar el proceso de prácticas.',
  },
  {
    id: 2,
    estado: 'Curso_Prepracticas',
    nombre: 'Curso Preprácticas',
    descripcion:
      'Completa el curso obligatorio de preprácticas para avanzar a la siguiente etapa del proceso.',
  },
  {
    id: 3,
    estado: 'Documentacion',
    nombre: 'Documentación',
    descripcion:
      'Sube los documentos requeridos para que la oficina de prácticas pueda validar tu cumplimiento.',
  },
  {
    id: 4,
    estado: 'Visible_Para_Empresas',
    nombre: 'Visible para Empresas',
    descripcion:
      'Tu perfil está disponible para las empresas y debes completar el documento final de carta de inicio.',
  },
];

const ACCIONES_PENDIENTES: Record<ProcesoBackendState, AccionPendiente[]> = {
  Requisitos_Minimos: [
    {
      id: '1-1',
      titulo: 'Cumplir requisitos mínimos',
      descripcion:
        'Asegúrate de tener los créditos aprobados y los documentos iniciales al día.',
      tipo: 'tarea',
    },
  ],
  Curso_Prepracticas: [
    {
      id: '2-1',
      titulo: 'Completar curso de preprácticas',
      descripcion:
        'Realiza el curso obligatorio de preparación para prácticas profesionales.',
      tipo: 'tarea',
    },
    {
      id: '2-2',
      titulo: 'Cargar certificado del curso',
      descripcion:
        'Sube el certificado de asistencia al curso de preprácticas en la sección de documentos.',
      tipo: 'documento',
    },
  ],
  Documentacion: [
    {
      id: '3-1',
      titulo: 'Subir hoja de vida institucional',
      descripcion:
        'Descarga, diligencia y sube tu hoja de vida institucional para el proceso de prácticas.',
      tipo: 'documento',
    },
    {
      id: '3-2',
      titulo: 'Subir compromiso académico',
      descripcion:
        'Completa el compromiso académico y súbelo para continuar con la revisión documental.',
      tipo: 'documento',
    },
  ],
  Visible_Para_Empresas: [
    {
      id: '4-1',
      titulo: 'Subir carta de inicio',
      descripcion:
        'Carga la carta de inicio para empezar tu proceso de practicas con la empresa.',
      tipo: 'documento',
    },
  ],
};

const getEstadoColor = (index: number, currentIndex: number) => {
  if (currentIndex === -1) return 'var(--color-gray-medium)';
  if (index < currentIndex) return 'var(--color-success)';
  if (index === currentIndex) return 'var(--color-secondary)';
  return 'var(--color-gray-medium)';
};

const getEstadoIcon = (index: number, currentIndex: number) => {
  if (currentIndex === -1 || index > currentIndex) {
    return <IconLock className="text-white/70" size={28} />;
  }

  if (index === currentIndex) {
    return <IconClock className="text-white" size={28} />;
  }

  return <IconCheck className="text-white" size={28} />;
};

export function ProcesoPage() {
  const [selectedEstado, setSelectedEstado] = useState<ProcesoStep | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { data: procesoData, isLoading, isError, error } = useQuery<ProcesoResponse, Error>({
    queryKey: ['proceso'],
    queryFn: estudianteService.getProceso,
  });

  const currentState = procesoData?.estado;
  const currentIndex = currentState
    ? PROCESO_STEPS.findIndex((step) => step.estado === currentState)
    : -1;

  const accionesPendientes = currentState ? ACCIONES_PENDIENTES[currentState] : [];
  const progressWidth = currentIndex >= 0 ? (currentIndex / (PROCESO_STEPS.length - 1)) * 100 : 0;

  const handleEstadoClick = (estado: ProcesoStep) => {
    setSelectedEstado(estado);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEstado(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 style={{ color: 'var(--color-primary)' }}>Mi Proceso de Prácticas</h1>
        <p style={{ color: 'var(--color-gray-medium)' }} className="mt-2">
          Visualiza el estado actual de tu proceso y las acciones pendientes para avanzar.
        </p>
      </div>

      <div className="p-8 rounded-2xl mb-8" style={{ backgroundColor: 'var(--color-white)' }}>
        <h2 className="mb-6" style={{ color: 'var(--color-text)' }}>
          Etapas del Proceso
        </h2>

        <div className="relative">
          <div className="hidden md:block absolute top-14 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full transition-all duration-500"
              style={{
                backgroundColor: 'var(--color-success)',
                width: `${progressWidth}%`,
              }}
            />
          </div>

          {isLoading ? (
            <div className="p-10 rounded-2xl border border-dashed border-gray-200 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <IconLoader className="animate-spin" size={20} />
                Cargando estado del proceso...
              </div>
            </div>
          ) : isError ? (
            <div className="p-10 rounded-2xl border border-red-200 text-center" style={{ color: 'var(--color-error)' }}>
              <p>No se pudo cargar el estado del proceso.</p>
              <p className="text-sm mt-2">{error?.message}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-6 md:gap-4 relative">
              {PROCESO_STEPS.map((estado, index) => (
                <div key={estado.id} className="flex flex-col items-center">
                  <button
                    onClick={() => handleEstadoClick(estado)}
                    className="w-28 h-28 rounded-full flex items-center justify-center mb-4 transition-all hover:scale-110 relative z-10"
                    style={{ backgroundColor: getEstadoColor(index, currentIndex) }}
                  >
                    {getEstadoIcon(index, currentIndex)}
                  </button>

                  <div className="text-center">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{
                        backgroundColor: getEstadoColor(index, currentIndex),
                        color: 'white',
                      }}
                    >
                      <span className="font-bold text-sm">{estado.id}</span>
                    </div>
                    <h3 className="font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                      {estado.nombre}
                    </h3>
                    {index === currentIndex && (
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
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'var(--color-success)' }} />
            <span className="text-sm" style={{ color: 'var(--color-gray-medium)' }}>
              Completado
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'var(--color-secondary)' }} />
            <span className="text-sm" style={{ color: 'var(--color-gray-medium)' }}>
              En progreso
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'var(--color-gray-medium)' }} />
            <span className="text-sm" style={{ color: 'var(--color-gray-medium)' }}>
              Pendiente
            </span>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-2xl" style={{ backgroundColor: 'var(--color-white)' }}>
        <h2 className="mb-6" style={{ color: 'var(--color-text)' }}>
          Acciones Pendientes
        </h2>

        {isLoading ? (
          <div className="p-10 rounded-2xl border border-dashed border-gray-200 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <IconLoader className="animate-spin" size={20} />
              Cargando acciones pendientes...
            </div>
          </div>
        ) : isError ? (
          <div className="p-10 rounded-2xl border border-red-200 text-center" style={{ color: 'var(--color-error)' }}>
            <p>No se pudieron cargar las acciones pendientes.</p>
          </div>
        ) : accionesPendientes.length > 0 ? (
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
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: tipoColors[accion.tipo] }}
                  >
                    <IconInfoCircle className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                      {accion.titulo}
                    </h3>
                    <p style={{ color: 'var(--color-gray-medium)' }}>{accion.descripcion}</p>
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
          <div className="text-center py-12" style={{ color: 'var(--color-gray-medium)' }}>
            <p>No tienes acciones pendientes en este momento.</p>
          </div>
        )}
      </div>

      {showModal && selectedEstado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full rounded-2xl p-8 relative" style={{ backgroundColor: 'var(--color-white)' }}>
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
                style={{ backgroundColor: selectedEstado ? getEstadoColor(selectedEstado.id - 1, currentIndex) : 'var(--color-gray-medium)' }}
              >
                {getEstadoIcon(selectedEstado.id - 1, currentIndex)}
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{
                  backgroundColor: selectedEstado ? getEstadoColor(selectedEstado.id - 1, currentIndex) : 'var(--color-gray-medium)',
                  color: 'white',
                }}
              >
                <span className="font-bold">{selectedEstado.id}</span>
              </div>
              <h2 style={{ color: 'var(--color-primary)' }}>{selectedEstado.nombre}</h2>
            </div>

            <p className="text-center mb-6" style={{ color: 'var(--color-gray-medium)' }}>
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
