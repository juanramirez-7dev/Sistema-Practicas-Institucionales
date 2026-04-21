import { useState } from 'react';
import {
  IconFileText,
  IconDownload,
  IconUpload,
  IconCheck,
  IconX,
  IconClock,
  IconAlertCircle,
} from '@tabler/icons-react';
import { DOCUMENTOS_ESTUDIANTE, type Documento } from '../../../lib/mockdata/estudiante.ts';

export function DocumentosPage() {
  const [documentos, setDocumentos] = useState(DOCUMENTOS_ESTUDIANTE);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleFileUpload = (documentoId: string, file: File) => {
    setUploadingId(documentoId);

    // Simular carga de archivo
    setTimeout(() => {
      setDocumentos((prev) =>
        prev.map((doc) =>
          doc.id === documentoId
            ? {
                ...doc,
                estado: 'enviado' as const,
                archivoSubido: {
                  nombre: file.name,
                  fecha: new Date().toISOString(),
                  url: URL.createObjectURL(file),
                },
              }
            : doc
        )
      );
      setUploadingId(null);
    }, 1500);
  };

  const getEstadoConfig = (estado: Documento['estado']) => {
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
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ color: 'var(--color-primary)' }}>Mis Documentos</h1>
        <p style={{ color: 'var(--color-gray-medium)' }} className="mt-2">
          Gestiona los documentos requeridos para tu proceso de prácticas
        </p>
      </div>

      {/* Resumen de estado */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: 'Total',
            value: documentos.length,
            color: 'var(--color-primary)',
          },
          {
            label: 'Pendientes',
            value: documentos.filter((d) => d.estado === 'pendiente').length,
            color: 'var(--color-gray-medium)',
          },
          {
            label: 'En Revisión',
            value: documentos.filter((d) => d.estado === 'enviado').length,
            color: 'var(--color-warning)',
          },
          {
            label: 'Aceptados',
            value: documentos.filter((d) => d.estado === 'aceptado').length,
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

      {/* Lista de documentos */}
      <div className="space-y-6">
        {documentos.map((documento) => {
          const estadoConfig = getEstadoConfig(documento.estado);
          const Icon = estadoConfig.icon;
          const isUploading = uploadingId === documento.id;

          return (
            <div
              key={documento.id}
              className="p-6 rounded-2xl border-2"
              style={{
                backgroundColor: 'var(--color-white)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Icono del documento */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: estadoConfig.bgColor }}
                >
                  <IconFileText size={32} style={{ color: estadoConfig.color }} />
                </div>

                {/* Información del documento */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                    <div>
                      <h2 style={{ color: 'var(--color-primary)' }}>
                        {documento.nombre}
                      </h2>
                      <p
                        className="text-sm mt-1"
                        style={{ color: 'var(--color-gray-medium)' }}
                      >
                        {documento.descripcion}
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

                  {/* Información del archivo subido */}
                  {documento.archivoSubido && (
                    <div
                      className="p-4 rounded-xl mb-4"
                      style={{ backgroundColor: 'var(--color-gray-light)' }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p
                            className="text-sm font-bold"
                            style={{ color: 'var(--color-text)' }}
                          >
                            {documento.archivoSubido.nombre}
                          </p>
                          <p
                            className="text-xs mt-1"
                            style={{ color: 'var(--color-gray-medium)' }}
                          >
                            Subido el{' '}
                            {new Date(
                              documento.archivoSubido.fecha
                            ).toLocaleDateString('es-CO')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Motivo de rechazo */}
                  {documento.estado === 'rechazado' && documento.motivoRechazo && (
                    <div
                      className="p-4 rounded-xl mb-4 flex items-start gap-3"
                      style={{
                        backgroundColor: '#FEE2E2',
                        color: 'var(--color-error)',
                      }}
                    >
                      <IconAlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-sm mb-1">Motivo de rechazo:</p>
                        <p className="text-sm">{documento.motivoRechazo}</p>
                      </div>
                    </div>
                  )}

                  {/* Botones de acción */}
                  <div className="flex flex-wrap gap-3">
                    {/* Descargar plantilla */}
                    {documento.tienePlantilla && (
                      <a
                        href={documento.urlPlantilla}
                        download
                        className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                        style={{
                          backgroundColor: 'var(--color-primary)',
                          color: 'white',
                        }}
                      >
                        <IconDownload size={18} />
                        Descargar Plantilla
                      </a>
                    )}

                    {/* Subir documento */}
                    {documento.estado !== 'aceptado' && (
                      <label
                        className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105 cursor-pointer"
                        style={{
                          backgroundColor: documento.estado === 'pendiente'
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
                              {documento.archivoSubido
                                ? 'Reemplazar Documento'
                                : 'Subir Documento'}
                            </span>
                          </>
                        )}
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(documento.id, file);
                            }
                          }}
                          className="hidden"
                          disabled={isUploading}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Información adicional */}
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
                días hábiles
              </li>
              <li>
                • Si un documento es rechazado, puedes volver a subirlo después de
                realizar las correcciones indicadas
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
