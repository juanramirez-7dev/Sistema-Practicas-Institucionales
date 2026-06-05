import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  IconFileText,
  IconUpload,
  IconEye,
  IconCheck,
  IconX,
  IconClock,
  IconAlertCircle,
} from '@tabler/icons-react';
import { estudianteService } from '../../services/estudianteService';
import type {
  DocumentoProcesoResponse,
  DocumentoProcesoTipo,
  ProcesoBackendState,
} from '../../types/estudianteTypes';

const DOCUMENTO_TITULOS: Record<DocumentoProcesoTipo, string> = {
  Certificado_Prepracticas: 'Certificado de Preprácticas',
  Hoda_De_Vida: 'Hoja de Vida institucional',
  Compromiso_Academico: 'Compromiso Académico',
};

const DOCUMENTO_DESCRIPCIONES: Record<DocumentoProcesoTipo, string> = {
  Certificado_Prepracticas:
    'Adjunta el certificado de asistencia o aprobación del curso de preprácticas.',
  Hoda_De_Vida:
    'Sube tu hoja de vida institucional actualizada para que la oficina pueda validar tu perfil.',
  Compromiso_Academico:
    'Carga el documento de compromiso académico firmado por la universidad.',
};

const getEstadoConfig = (estado: DocumentoProcesoResponse['estado']) => {
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
        bgColor: 'var(--color-gray-light)',
        icon: IconClock,
        texto: 'Pendiente',
      };
  }
};

const getDocumentosRequeridos = (
  estadoProceso?: ProcesoBackendState
): DocumentoProcesoTipo[] => {
  if (estadoProceso === 'Curso_Prepracticas') {
    return ['Certificado_Prepracticas'];
  }
  if (estadoProceso === 'Documentacion') {
    return ['Certificado_Prepracticas', 'Hoda_De_Vida', 'Compromiso_Academico'];
  }
  return [];
};


export function DocumentosPage() {
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const procesoQuery = useQuery({
    queryKey: ['proceso'],
    queryFn: estudianteService.getProceso,
  });

  const documentosQuery = useQuery({
    queryKey: ['documentosProceso'],
    queryFn: estudianteService.getDocumentosProceso,
  });

  const uploadMutation = useMutation({
    mutationFn: async ({
      tipo,
      documentoId,
      file,
    }: {
      tipo: DocumentoProcesoTipo;
      documentoId?: string;
      file: File;
    }) => {
      if (documentoId) {
        return estudianteService.replaceDocumento(documentoId, file);
      }

      return estudianteService.uploadDocumento(tipo, file);
    },
    onMutate: ({ documentoId }) => {
      setUploadingId(documentoId ?? 'nuevo');
      setUploadError(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentosProceso'] });
    },
    onSettled: () => {
      setUploadingId(null);
    },
    onError: (error) => {
      setUploadError(error?.message ?? 'No se pudo subir el documento.');
    },
  });

  const isLoading = procesoQuery.isLoading || documentosQuery.isLoading;
  const proceso = procesoQuery.data;
  const requiredTypes = getDocumentosRequeridos(proceso?.estado);

  const documentos: DocumentoProcesoResponse[] = requiredTypes.map((tipo) => {
    const existing = documentosQuery.data?.find((doc) => doc.tipo === tipo);
    return (
      existing ?? {
        id: '',
        tipo,
        estado: 'Pendiente',
        observacion: null,
        fechaCarga: '',
        url: '',
        procesoId: proceso?.id ?? '',
      }
    );
  });

  const totalPendientes = documentos.filter((doc) => doc.estado === 'Pendiente').length;
  const totalRevision = documentos.filter((doc) => doc.estado === 'Enviado').length;
  const totalAprobados = documentos.filter((doc) => doc.estado === 'Aprobado').length;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 style={{ color: 'var(--color-primary)' }}>Mis Documentos</h1>
        <p style={{ color: 'var(--color-gray-medium)' }} className="mt-2">
          Gestiona los documentos requeridos para tu proceso de prácticas.
        </p>
      </div>

      {isLoading ? (
        <div className="p-6 rounded-2xl bg-white shadow-sm">
          <p style={{ color: 'var(--color-gray-medium)' }}>Cargando documentos...</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: 'Total',
                value: documentos.length,
                color: 'var(--color-primary)',
              },
              {
                label: 'Pendientes',
                value: totalPendientes,
                color: 'var(--color-gray-medium)',
              },
              {
                label: 'En Revisión',
                value: totalRevision,
                color: 'var(--color-warning)',
              },
              {
                label: 'Aprobados',
                value: totalAprobados,
                color: 'var(--color-success)',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl"
                style={{ backgroundColor: 'var(--color-white)' }}
              >
                <p
                  className="text-sm mb-1"
                  style={{ color: 'var(--color-gray-medium)' }}
                >
                  {item.label}
                </p>
                <p className="text-2xl font-bold" style={{ color: item.color }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {uploadError && (
            <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: '#FEE2E2', color: 'var(--color-error)' }}>
              {uploadError}
            </div>
          )}

          {documentos.length === 0 ? (
            <div className="p-6 rounded-2xl bg-white shadow-sm">
              <p style={{ color: 'var(--color-gray-medium)' }}>
                En este momento no hay documentos disponibles para subir según tu estado de proceso.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {documentos.map((documento) => {
                const estadoConfig = getEstadoConfig(documento.estado);
                const Icon = estadoConfig.icon;
                const isUploading = uploadingId === documento.id || uploadingId === 'nuevo' && documento.id === '';

                return (
                  <div
                    key={documento.tipo}
                    className="p-6 rounded-2xl border-2"
                    style={{
                      backgroundColor: 'var(--color-white)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: estadoConfig.bgColor }}
                      >
                        <IconFileText size={32} style={{ color: estadoConfig.color }} />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                          <div>
                            <h2 style={{ color: 'var(--color-primary)' }}>
                              {DOCUMENTO_TITULOS[documento.tipo]}
                            </h2>
                            <p
                              className="text-sm mt-1"
                              style={{ color: 'var(--color-gray-medium)' }}
                            >
                              {DOCUMENTO_DESCRIPCIONES[documento.tipo]}
                            </p>
                          </div>
                          <div
                            className="flex items-center gap-2 px-4 py-2 rounded-lg"
                            style={{
                              backgroundColor: estadoConfig.bgColor,
                              color: estadoConfig.color,
                            }}
                          >
                            <Icon size={18} />
                            <span className="font-bold text-sm">{estadoConfig.texto}</span>
                          </div>
                        </div>

                        {documento.url && (
                          <div className="flex flex-wrap gap-3 mb-4">
                            <a
                              href={documento.url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                              style={{
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                              }}
                            >
                              <IconEye size={18} />
                              Ver Documento
                            </a>
                          </div>
                        )}

                        {documento.estado !== 'Aprobado' && (
                          <label
                            className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105 cursor-pointer"
                            style={{
                              backgroundColor:
                                documento.estado === 'Pendiente'
                                  ? 'var(--color-secondary)'
                                  : 'var(--color-warning)',
                              color: 'white',
                            }}
                          >
                            {isUploading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Subiendo...</span>
                              </>
                            ) : (
                              <>
                                <IconUpload size={18} />
                                <span>
                                  {documento.id ? 'Reemplazar Documento' : 'Subir Documento'}
                                </span>
                              </>
                            )}
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                uploadMutation.mutate({
                                  tipo: documento.tipo,
                                  documentoId: documento.id || undefined,
                                  file,
                                });
                              }}
                              className="hidden"
                              disabled={isUploading}
                            />
                          </label>
                        )}

                        {documento.estado === 'Rechazado' && documento.observacion && (
                          <div
                            className="p-4 rounded-xl mt-4"
                            style={{ backgroundColor: '#FEE2E2', color: 'var(--color-error)' }}
                          >
                            <div className="flex items-start gap-3">
                              <IconAlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-bold text-sm mb-1">Motivo de rechazo:</p>
                                <p className="text-sm">{documento.observacion}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      <div
        className="mt-8 p-6 rounded-xl"
        style={{ backgroundColor: 'var(--color-white)' }}
      >
        <div className="flex items-start gap-3">
          <IconAlertCircle
            size={20}
            style={{ color: 'var(--color-secondary)' }}
            className="flex-shrink-0 mt-0.5"
          />
          <div>
            <p className="font-bold mb-2" style={{ color: 'var(--color-text)' }}>
              Importante
            </p>
            <ul
              className="space-y-1 text-sm"
              style={{ color: 'var(--color-gray-medium)' }}
            >
              <li>• Solo se aceptan archivos en formato PDF, DOC o DOCX</li>
              <li>
                • La oficina de prácticas revisará tus documentos en un plazo de 3-5
                días hábiles.
              </li>
              <li>
                • Si un documento es rechazado, puedes volver a subirlo después de
                realizar las correcciones indicadas.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
