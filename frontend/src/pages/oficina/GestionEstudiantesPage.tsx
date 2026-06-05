import { useState } from 'react';
import {
  IconUser,
  IconFileText,
  IconCheck,
  IconX,
  IconClock,
  IconDownload,
  IconUsers,
  IconEye,
  IconLoader2,
} from '@tabler/icons-react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { estudianteService } from '../../services/estudianteService';
import type {
  UsuarioResponse,
  ProcesoResponse,
  DocumentoProcesoResponse,
  DocumentoProcesoEstado
} from '../../types/estudianteTypes';

type EstudianteUI = UsuarioResponse & {
  proceso?: ProcesoResponse;
  documentos?: DocumentoProcesoResponse[];
};

export function GestionEstudiantesPage() {
  const [selectedDoc, setSelectedDoc] = useState<{
    estudiante: EstudianteUI;
    documento: DocumentoProcesoResponse;
  } | null>(null);  
  const [showModal, setShowModal] = useState(false);
  const [motivoRechazo, setMotivoRechazo] = useState('');
  const [accionRealizada, setAccionRealizada] = useState(false);
  const queryClient = useQueryClient();

  const gestionQuery = useQuery({
    queryKey: ['gestionEstudiantes'],
    queryFn: async () => {
      const estudiantes = await estudianteService.getAllEstudiantes();
      const enriched = await Promise.all(
        estudiantes.map(async (est) => {
          const proceso = await estudianteService.getProcesoByEstudiante(est.id).catch(() => null);
          const documentos = await estudianteService
            .getDocumentosProcesoByEstudiante(est.id)
            .catch(() => []);
          return { ...est, proceso, documentos } as EstudianteUI;
        })
      );
      return enriched;
    },
  });

  const estudiantes = gestionQuery.data || [];
  const isLoading = gestionQuery.isLoading;
  const isError = gestionQuery.isError;

  const contarDocumentos = () => {
    const counts = { Pendiente: 0, Enviado: 0, Aprobado: 0, Rechazado: 0 } as Record<string, number>;
    estudiantes.forEach((est) => {
      (est.documentos || []).forEach((doc) => {
        counts[doc.estado] = (counts[doc.estado] || 0) + 1;
      });
    });
    return counts;
  };

  const contadorDocs = contarDocumentos();



  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectObservations, setRejectObservations] = useState<Record<string, string>>({});

  const updateEstadoMutation = useMutation({
    mutationFn: ({ documentoId, payload }: { documentoId: string; payload: { estado: DocumentoProcesoEstado; observacion?: string | null } }) =>
      estudianteService.updateDocumentoEstado(documentoId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gestionEstudiantes'] });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });

  const handleAprobar = async () => {
    if (!selectedDoc) return;
    await estudianteService.updateDocumentoEstado(selectedDoc.documento.id, { estado: 'Aprobado' }).catch((e) => {
      console.error(e);
    });
    setAccionRealizada(true);
    queryClient.invalidateQueries({ queryKey: ['gestionEstudiantes'] });
    setTimeout(() => {
      setShowModal(false);
      setSelectedDoc(null);
      setMotivoRechazo('');
      setAccionRealizada(false);
    }, 1200);
  };

  const handleRechazar = async () => {
    if (!selectedDoc || !motivoRechazo.trim()) return;
    await estudianteService.updateDocumentoEstado(selectedDoc.documento.id, {
      estado: 'Rechazado',
      observacion: motivoRechazo,
    }).catch((e) => {
      console.error(e);
    });
    setAccionRealizada(true);
    queryClient.invalidateQueries({ queryKey: ['gestionEstudiantes'] });
    setTimeout(() => {
      setShowModal(false);
      setSelectedDoc(null);
      setMotivoRechazo('');
      setAccionRealizada(false);
    }, 1200);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDoc(null);
    setMotivoRechazo('');
    setAccionRealizada(false);
  };

  const getEstadoConfig = (estado: string) => {
    switch (estado) {
      case 'Pendiente':
        return {
          color: 'var(--color-gray-medium)',
          bgColor: 'var(--color-gray-light)',
          icon: IconClock,
          texto: 'Pendiente',
        };
      case 'Enviado':
        return {
          color: 'var(--color-warning)',
          bgColor: '#FEF3C7',
          icon: IconClock,
          texto: 'En Revisión',
        };
      case 'Aprobado':
        return {
          color: 'var(--color-success)',
          bgColor: '#D1FAE5',
          icon: IconCheck,
          texto: 'Aprobado',
        };
      case 'Rechazado':
        return {
          color: 'var(--color-error)',
          bgColor: '#FEE2E2',
          icon: IconX,
          texto: 'Rechazado',
        };
      default:
        return {
          color: 'var(--color-gray-medium)',
          bgColor: 'var(--color-white)',
          icon: IconFileText,
          texto: estado,
        };
    }
  };

  const isActionableState = (estado?: string) => {
    if (!estado) return false;
    const s = estado.toLowerCase();
    return s === 'enviado' || s === 'pendiente';
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ color: 'var(--color-primary)' }}>
          Gestión de Estudiantes
        </h1>
        <p style={{ color: 'var(--color-gray-medium)' }} className="mt-2">
          Administra los procesos de prácticas y revisa la documentación de los
          estudiantes
        </p>
      </div>

      {/* Resumen de documentos */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div
          className="p-6 rounded-2xl"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <IconUsers className="text-white" size={24} />
            </div>
            <div>
              <p
                className="text-sm"
                style={{ color: 'var(--color-gray-medium)' }}
              >
                Estudiantes Activos
              </p>
              <p
                className="text-2xl font-bold"
                style={{ color: 'var(--color-primary)' }}
              >
                {estudiantes.length}
              </p>
            </div>
          </div>
        </div>

        <div
          className="p-6 rounded-2xl"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-warning)' }}
            >
              <IconClock className="text-white" size={24} />
            </div>
            <div>
              <p
                className="text-sm"
                style={{ color: 'var(--color-gray-medium)' }}
              >
                Por Revisar
              </p>
              <p
                className="text-2xl font-bold"
                style={{ color: 'var(--color-warning)' }}
              >
                {contadorDocs.Enviado || 0}
              </p>
            </div>
          </div>
        </div>

        <div
          className="p-6 rounded-2xl"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-success)' }}
            >
              <IconCheck className="text-white" size={24} />
            </div>
            <div>
              <p
                className="text-sm"
                style={{ color: 'var(--color-gray-medium)' }}
              >
                Aprobados
              </p>
              <p
                className="text-2xl font-bold"
                style={{ color: 'var(--color-success)' }}
              >
                {contadorDocs.Aprobado || 0}
              </p>
            </div>
          </div>
        </div>

        <div
          className="p-6 rounded-2xl"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-error)' }}
            >
              <IconX className="text-white" size={24} />
            </div>
            <div>
              <p
                className="text-sm"
                style={{ color: 'var(--color-gray-medium)' }}
              >
                Rechazados
              </p>
              <p
                className="text-2xl font-bold"
                style={{ color: 'var(--color-error)' }}
              >
                {contadorDocs.Rechazado || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de estudiantes */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="p-12 rounded-2xl text-center" style={{ backgroundColor: 'var(--color-white)'}}>
            <p style={{ color: 'var(--color-gray-medium)' }}>Cargando estudiantes...</p>
          </div>
        ) : isError ? (
          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#FEE2E2', color: 'var(--color-error)'}}>
            <p>No se pudieron cargar los estudiantes.</p>
          </div>
        ) : (
          estudiantes.map((estudiante) => (
            <div
              key={estudiante.id}
              className="p-6 rounded-2xl border-2"
              style={{
                backgroundColor: 'var(--color-white)',
                borderColor: 'var(--color-border)',
              }}
            >
              {/* Encabezado del estudiante */}
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-gray-light)' }}
                >
                  <IconUser size={28} style={{ color: 'var(--color-gray-medium)' }} />
                </div>

                <div className="flex-1">
                  <h2 style={{ color: 'var(--color-primary)' }}>
                    {estudiante.nombre}
                  </h2>
                  <p
                    className="text-sm mt-1"
                    style={{ color: 'var(--color-gray-medium)' }}
                  >
                    {estudiante.carrera} • Carnet: {estudiante.carnet} • Documento: {estudiante.documentoIdentidad}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span
                      className="text-xs px-3 py-1 rounded-lg"
                      style={{
                        backgroundColor: 'var(--color-gray-light)',
                        color: 'var(--color-text)',
                      }}
                    >
                      Créditos: {estudiante.creditosAprobados}
                    </span>
                    <span
                      className="text-xs px-3 py-1 rounded-lg"
                      style={{
                        backgroundColor: 'var(--color-secondary)',
                        color: 'white',
                      }}
                    >
                      Estado: {estudiante.proceso?.estado || 'No iniciado'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Documentos del estudiante */}
              <div>
                <h3
                  className="mb-4 flex items-center gap-2"
                  style={{ color: 'var(--color-text)' }}
                >
                  <IconFileText size={20} />
                  Documentos
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {(estudiante.documentos || []).map((documento) => {
                    const estadoConfig = getEstadoConfig(documento.estado);
                    const Icon = estadoConfig.icon;

                    return (
                      <div
                        key={documento.id}
                        className="p-4 rounded-xl border-2"
                        style={{
                          backgroundColor: estadoConfig.bgColor,
                          borderColor: estadoConfig.color,
                        }}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <Icon size={20} style={{ color: estadoConfig.color }} />
                          <div className="flex-1">
                            <p
                              className="font-bold text-sm"
                              style={{ color: 'var(--color-text)' }}
                            >
                              {documento.tipo}
                            </p>
                            <p
                              className="text-xs mt-1"
                              style={{ color: estadoConfig.color }}
                            >
                              {estadoConfig.texto}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {documento.url && (
                            <a
                              href={documento.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-sm transition-all hover:scale-[1.02]"
                              style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}
                            >
                              <IconEye size={16} />
                              Ver
                            </a>
                          )}

                          {isActionableState(documento.estado) && (
                            <>
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={async () => {
                                    try {
                                      await updateEstadoMutation.mutateAsync({ documentoId: documento.id, payload: { estado: 'Aprobado' } });
                                    } catch (e) {
                                      console.error(e);
                                    }
                                  }}
                                  disabled={updateEstadoMutation.isPending}
                                  className="px-3 py-2 rounded-lg font-bold text-sm transition-all hover:scale-[1.02]"
                                  style={{
                                    backgroundColor: 'var(--color-success)',
                                    color: 'white',
                                  }}
                                >
                                  {updateEstadoMutation.isPending ? <IconLoader2 className="animate-spin" size={16} /> : <IconCheck size={16} />}
                                  <span className="ml-2">Aceptar</span>
                                </button>

                                <button
                                  onClick={() => setRejectingId(rejectingId === documento.id ? null : documento.id)}
                                  className="px-3 py-2 rounded-lg font-bold text-sm transition-all hover:scale-[1.02]"
                                  style={{
                                    backgroundColor: 'var(--color-error)',
                                    color: 'white',
                                  }}
                                >
                                  <IconX size={16} />
                                  <span className="ml-2">Rechazar</span>
                                </button>
                              </div>

                              {rejectingId === documento.id && (
                                <div className="mt-2">
                                  <textarea
                                    value={rejectObservations[documento.id] || ''}
                                    onChange={(e) => setRejectObservations((s) => ({ ...s, [documento.id]: e.target.value }))}
                                    rows={3}
                                    className="w-full px-3 py-2 rounded-lg border-2 focus:outline-none mb-2"
                                    placeholder="Escribe la observación obligatoria para el rechazo"
                                    style={{ backgroundColor: 'var(--color-gray-light)', borderColor: 'var(--color-border)' }}
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      onClick={async () => {
                                        const observacion = rejectObservations[documento.id] || '';
                                        if (!observacion.trim()) return;
                                        try {
                                          await updateEstadoMutation.mutateAsync({ documentoId: documento.id, payload: { estado: 'Rechazado', observacion } });
                                          setRejectingId(null);
                                        } catch (e) {
                                          console.error(e);
                                        }
                                      }}
                                      className="px-4 py-2 rounded-lg font-bold"
                                      style={{ backgroundColor: 'var(--color-error)', color: 'white' }}
                                    >
                                      Confirmar Rechazo
                                    </button>
                                    <button
                                      onClick={() => setRejectingId(null)}
                                      className="px-4 py-2 rounded-lg font-bold"
                                      style={{ backgroundColor: 'var(--color-gray-light)', color: 'var(--color-text)' }}
                                    >
                                      Cancelar
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de revisión de documento */}
      {showModal && selectedDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="max-w-2xl w-full rounded-2xl p-8 relative"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            {!accionRealizada ? (
              <>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4"
                  style={{ color: 'var(--color-gray-medium)' }}
                >
                  <IconX size={24} />
                </button>

                <h2 className="mb-6" style={{ color: 'var(--color-primary)' }}>
                  Revisión de Documento
                </h2>

                {/* Información del estudiante */}
                <div
                  className="p-4 rounded-xl mb-6"
                  style={{ backgroundColor: 'var(--color-gray-light)' }}
                >
                  <p
                    className="text-sm font-bold"
                    style={{ color: 'var(--color-gray-medium)' }}
                  >
                    Estudiante
                  </p>
                  <p className="font-bold" style={{ color: 'var(--color-text)' }}>
                    {selectedDoc.estudiante.nombre}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-gray-medium)' }}>
                    {selectedDoc.estudiante.correo}
                  </p>
                </div>

                {/* Información del documento */}
                <div className="mb-6">
                  <h3 className="mb-3" style={{ color: 'var(--color-text)' }}>
                    {selectedDoc.documento.tipo}
                  </h3>
                  {selectedDoc.documento.fechaCarga && (
                    <p
                      className="text-sm mb-4"
                      style={{ color: 'var(--color-gray-medium)' }}
                    >
                      Subido el{' '}
                      {new Date(selectedDoc.documento.fechaCarga).toLocaleDateString('es-CO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}

                  {selectedDoc.documento.url && (
                    <a
                      href={selectedDoc.documento.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105 mb-4"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                      }}
                    >
                      <IconDownload size={18} />
                      Ver Documento
                    </a>
                  )}
                </div>

                {/* Formulario de rechazo */}
                <div className="mb-6">
                  <label
                    className="block mb-2"
                    style={{ color: 'var(--color-text)' }}
                  >
                    Motivo de rechazo (obligatorio para rechazar)
                  </label>
                  <textarea
                    value={motivoRechazo}
                    onChange={(e) => setMotivoRechazo(e.target.value)}
                    rows={4}
                    placeholder="Indica el motivo por el cual se rechaza el documento..."
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
                    style={{
                      backgroundColor: 'var(--color-gray-light)',
                      borderColor: 'var(--color-border)',
                    }}
                  />
                </div>

                {/* Botones de acción */}
                {isActionableState(selectedDoc.documento.estado) ? (
                  <div className="flex gap-4">
                    <button
                      onClick={handleAprobar}
                      className="flex-1 px-6 py-3 rounded-xl font-bold transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: 'var(--color-success)',
                        color: 'white',
                      }}
                    >
                      <IconCheck size={20} />
                      Aprobar Documento
                    </button>
                    <button
                      onClick={handleRechazar}
                      disabled={!motivoRechazo.trim()}
                      className="flex-1 px-6 py-3 rounded-xl font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: 'var(--color-error)',
                        color: 'white',
                      }}
                    >
                      <IconX size={20} />
                      Rechazar Documento
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-gray-light)' }}>
                    <p style={{ color: 'var(--color-text)' }} className="font-bold">Estado: {selectedDoc.documento.estado}</p>
                    {selectedDoc.documento.observacion && (
                      <p style={{ color: 'var(--color-gray-medium)' }} className="mt-2">Observación: {selectedDoc.documento.observacion}</p>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'var(--color-success)' }}
                >
                  <IconCheck className="text-white" size={40} />
                </div>
                <h2 style={{ color: 'var(--color-success)' }}>
                  ¡Acción realizada exitosamente!
                </h2>
                <p
                  className="mt-2"
                  style={{ color: 'var(--color-gray-medium)' }}
                >
                  El estudiante será notificado del cambio de estado
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
