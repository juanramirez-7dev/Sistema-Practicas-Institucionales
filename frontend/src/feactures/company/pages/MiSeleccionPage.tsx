import {
  IconUser,
  IconMail,
  IconPhone,
  IconDownload,
  IconUserCheck,
} from '@tabler/icons-react';
import { getEstudiantesSeleccionados } from '../../../lib/mockdata/empresa.ts';
import { useAuth } from '../../../hooks/useAuth.ts';

export function MiSeleccionPage() {
  const { user } = useAuth();
  const estudiantesSeleccionados = getEstudiantesSeleccionados(user?.id || '');

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ color: 'var(--color-primary)' }}>Mi Selección</h1>
        <p style={{ color: 'var(--color-gray-medium)' }} className="mt-2">
          Estudiantes que has seleccionado como candidatos de interés
        </p>
      </div>

      {/* Contador */}
      <div
        className="p-6 rounded-2xl mb-6"
        style={{ backgroundColor: 'var(--color-secondary)' }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            <IconUserCheck size={32} style={{ color: 'var(--color-secondary)' }} />
          </div>
          <div>
            <p className="text-white/80 text-sm">Estudiantes seleccionados</p>
            <h2 className="text-white font-bold text-3xl">
              {estudiantesSeleccionados.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Lista de seleccionados */}
      {estudiantesSeleccionados.length > 0 ? (
        <div className="space-y-6">
          {estudiantesSeleccionados.map((estudiante) => (
            <div
              key={estudiante.id}
              className="p-6 rounded-2xl border-2"
              style={{
                backgroundColor: 'var(--color-white)',
                borderColor: 'var(--color-success)',
              }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Foto */}
                <div className="flex-shrink-0">
                  {estudiante.foto ? (
                    <img
                      src={estudiante.foto}
                      alt={estudiante.nombre}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--color-gray-light)' }}
                    >
                      <IconUser
                        size={40}
                        style={{ color: 'var(--color-gray-medium)' }}
                      />
                    </div>
                  )}
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
                        {estudiante.programa}
                      </p>
                      <div className="flex gap-4 mt-2">
                        <div>
                          <p
                            className="text-xs font-bold"
                            style={{ color: 'var(--color-gray-medium)' }}
                          >
                            Semestre
                          </p>
                          <p
                            className="font-bold"
                            style={{ color: 'var(--color-text)' }}
                          >
                            {estudiante.semestre}
                          </p>
                        </div>
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
                      </div>
                    </div>
                    <div
                      className="px-4 py-2 rounded-lg flex items-center gap-2"
                      style={{
                        backgroundColor: 'var(--color-success)',
                        color: 'white',
                      }}
                    >
                      <IconUserCheck size={18} />
                      <span className="font-bold text-sm">Seleccionado</span>
                    </div>
                  </div>

                  {/* Descripción */}
                  <p
                    className="mb-4"
                    style={{ color: 'var(--color-gray-medium)' }}
                  >
                    {estudiante.descripcion}
                  </p>

                  {/* Habilidades */}
                  <div className="mb-4">
                    <p
                      className="text-xs font-bold mb-2"
                      style={{ color: 'var(--color-gray-medium)' }}
                    >
                      Habilidades
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {estudiante.habilidades.map((habilidad) => (
                        <span
                          key={habilidad}
                          className="text-sm px-3 py-1 rounded"
                          style={{
                            backgroundColor: 'var(--color-secondary)',
                            color: 'white',
                          }}
                        >
                          {habilidad}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Áreas de interés */}
                  <div className="mb-4">
                    <p
                      className="text-xs font-bold mb-2"
                      style={{ color: 'var(--color-gray-medium)' }}
                    >
                      Áreas de Interés
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {estudiante.areasInteres.map((area) => (
                        <span
                          key={area}
                          className="text-sm px-3 py-1 rounded"
                          style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                          }}
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contacto y acciones */}
                  <div
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: 'var(--color-gray-light)' }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <IconMail
                            size={16}
                            style={{ color: 'var(--color-secondary)' }}
                          />
                          <a
                            href={`mailto:${estudiante.email}`}
                            className="text-sm hover:underline"
                            style={{ color: 'var(--color-text)' }}
                          >
                            {estudiante.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconPhone
                            size={16}
                            style={{ color: 'var(--color-secondary)' }}
                          />
                          <a
                            href={`tel:${estudiante.telefono}`}
                            className="text-sm hover:underline"
                            style={{ color: 'var(--color-text)' }}
                          >
                            {estudiante.telefono}
                          </a>
                        </div>
                      </div>

                      {estudiante.hojaVidaUrl && (
                        <a
                          href={estudiante.hojaVidaUrl}
                          download
                          className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                          style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                          }}
                        >
                          <IconDownload size={18} />
                          Hoja de Vida
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="p-12 rounded-2xl text-center"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <IconUserCheck
            size={64}
            className="mx-auto mb-4"
            style={{ color: 'var(--color-gray-medium)' }}
          />
          <h2 style={{ color: 'var(--color-text)' }}>
            Aún no has seleccionado estudiantes
          </h2>
          <p
            className="mt-2"
            style={{ color: 'var(--color-gray-medium)' }}
          >
            Explora los perfiles disponibles y selecciona los candidatos que te
            interesen
          </p>
        </div>
      )}
    </div>
  );
}
