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
} from '@tabler/icons-react';
import {
  ESTUDIANTES_OFICINA,
  contarDocumentosPorEstado,
  type EstudianteOficina,
  type DocumentoOficina,
} from '../../../lib/mockdata/oficina.ts';

export function GestionEstudiantesPage() {
  const [estudiantes, setEstudiantes] = useState(ESTUDIANTES_OFICINA);
  const [selectedDoc, setSelectedDoc] = useState<{
    estudiante: EstudianteOficina;
    documento: DocumentoOficina;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [motivoRechazo, setMotivoRechazo] = useState('');
  const [accionRealizada, setAccionRealizada] = useState(false);

  const contadorDocs = contarDocumentosPorEstado();

  const handleVerDocumento = (
    estudiante: EstudianteOficina,
    documento: DocumentoOficina
  ) => {
    setSelectedDoc({ estudiante, documento });
    setShowModal(true);
    setMotivoRechazo('');
    setAccionRealizada(false);
  };

  const handleAprobar = () => {
    if (!selectedDoc) return;

    setEstudiantes((prev) =>
      prev.map((est) =>
        est.id === selectedDoc.estudiante.id
          ? {
              ...est,
              documentos: est.documentos.map((doc) =>
                doc.id === selectedDoc.documento.id
                  ? { ...doc, estado: 'aceptado' as const }
                  : doc
              ),
            }
          : est
      )
    );

    setAccionRealizada(true);
    setTimeout(() => {
      setShowModal(false);
      setSelectedDoc(null);
    }, 1500);
  };

  const handleRechazar = () => {
    if (!selectedDoc || !motivoRechazo.trim()) return;

    setEstudiantes((prev) =>
      prev.map((est) =>
        est.id === selectedDoc.estudiante.id
          ? {
              ...est,
              documentos: est.documentos.map((doc) =>
                doc.id === selectedDoc.documento.id
                  ? {
                      ...doc,
                      estado: 'rechazado' as const,
                      motivoRechazo: motivoRechazo,
                    }
                  : doc
              ),
            }
          : est
      )
    );

    setAccionRealizada(true);
    setTimeout(() => {
      setShowModal(false);
      setSelectedDoc(null);
      setMotivoRechazo('');
    }, 1500);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDoc(null);
    setMotivoRechazo('');
    setAccionRealizada(false);
  };

  const getEstadoConfig = (estado: DocumentoOficina['estado']) => {
    switch (estado) {
      case 'pendiente':
        return {
          color: 'var(--color-gray-medium)',
          bgColor: 'var(--color-gray-light)',
          icon: IconClock,
          texto: 'Pendiente',
        };
      case 'enviado':
        return {
          color: 'var(--color-warning)',
          bgColor: '#FEF3C7',
          icon: IconClock,
          texto: 'En Revisión',
        };
      case 'aceptado':
        return {
          color: 'var(--color-success)',
          bgColor: '#D1FAE5',
          icon: IconCheck,
          texto: 'Aceptado',
        };
      case 'rechazado':
        return {
          color: 'var(--color-error)',
          bgColor: '#FEE2E2',
          icon: IconX,
          texto: 'Rechazado',
        };
    }
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
                {contadorDocs.enviado}
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
                {contadorDocs.aceptado}
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
                {contadorDocs.rechazado}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de estudiantes */}
      <div className="space-y-6">
        {estudiantes.map((estudiante) => (
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
                  {estudiante.programa} • Semestre {estudiante.semestre} •
                  Documento: {estudiante.documento}
                </p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <span
                    className="text-xs px-3 py-1 rounded-lg"
                    style={{
                      backgroundColor: 'var(--color-gray-light)',
                      color: 'var(--color-text)',
                    }}
                  >
                    Promedio: {estudiante.promedio.toFixed(1)}
                  </span>
                  <span
                    className="text-xs px-3 py-1 rounded-lg"
                    style={{
                      backgroundColor: 'var(--color-secondary)',
                      color: 'white',
                    }}
                  >
                    {estudiante.estadoNombre}
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
                {estudiante.documentos.map((documento) => {
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
                            {documento.nombre}
                          </p>
                          <p
                            className="text-xs mt-1"
                            style={{ color: estadoConfig.color }}
                          >
                            {estadoConfig.texto}
                          </p>
                        </div>
                      </div>

                      {documento.estado === 'enviado' && (
                        <button
                          onClick={() => handleVerDocumento(estudiante, documento)}
                          className="w-full px-3 py-2 rounded-lg font-bold text-sm transition-all hover:scale-[1.02]"
                          style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                          }}
                        >
                          <IconEye size={16} className="inline mr-2" />
                          Revisar
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
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
                    {selectedDoc.estudiante.email}
                  </p>
                </div>

                {/* Información del documento */}
                <div className="mb-6">
                  <h3 className="mb-3" style={{ color: 'var(--color-text)' }}>
                    {selectedDoc.documento.nombre}
                  </h3>
                  {selectedDoc.documento.fechaSubida && (
                    <p
                      className="text-sm mb-4"
                      style={{ color: 'var(--color-gray-medium)' }}
                    >
                      Subido el{' '}
                      {new Date(
                        selectedDoc.documento.fechaSubida
                      ).toLocaleDateString('es-CO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}

                  {selectedDoc.documento.urlArchivo && (
                    <a
                      href={selectedDoc.documento.urlArchivo}
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
                    Motivo de rechazo (opcional)
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
