import {
  IconBuildingSkyscraper,
  IconMail,
  IconPhone,
  IconCalendar,
  IconInfoCircle,
} from '@tabler/icons-react';
import { EMPRESAS_INTERESADAS } from '../../lib/mockdata/estudiante.ts';

export function EmpresasPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ color: 'var(--color-primary)' }}>Empresas Interesadas</h1>
        <p style={{ color: 'var(--color-gray-medium)' }} className="mt-2">
          Empresas que han mostrado interés en tu perfil profesional
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
            <IconBuildingSkyscraper
              size={32}
              style={{ color: 'var(--color-secondary)' }}
            />
          </div>
          <div>
            <p className="text-white/80 text-sm">Total de empresas interesadas</p>
            <h2 className="text-white font-bold text-3xl">
              {EMPRESAS_INTERESADAS.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Lista de empresas */}
      {EMPRESAS_INTERESADAS.length > 0 ? (
        <div className="space-y-6">
          {EMPRESAS_INTERESADAS.map((empresa) => (
            <div
              key={empresa.id}
              className="p-6 rounded-2xl border-2"
              style={{
                backgroundColor: 'var(--color-white)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Icono de la empresa */}
                <div
                  className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <IconBuildingSkyscraper className="text-white" size={32} />
                </div>

                {/* Información de la empresa */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h2 style={{ color: 'var(--color-primary)' }}>
                        {empresa.nombre}
                      </h2>
                      <p
                        className="text-sm mt-1"
                        style={{ color: 'var(--color-gray-medium)' }}
                      >
                        {empresa.sector}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <IconCalendar
                        size={16}
                        style={{ color: 'var(--color-gray-medium)' }}
                      />
                      <span style={{ color: 'var(--color-gray-medium)' }}>
                        Interesada desde {formatDate(empresa.fechaInteres)}
                      </span>
                    </div>
                  </div>

                  <p
                    className="mb-6"
                    style={{ color: 'var(--color-gray-medium)' }}
                  >
                    {empresa.descripcion}
                  </p>

                  {/* Información de contacto */}
                  <div
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: 'var(--color-gray-light)' }}
                  >
                    <h3
                      className="font-bold mb-3 flex items-center gap-2"
                      style={{ color: 'var(--color-text)' }}
                    >
                      <IconInfoCircle size={18} />
                      Información de Contacto
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p
                          className="text-xs font-bold mb-1"
                          style={{ color: 'var(--color-gray-medium)' }}
                        >
                          Contacto
                        </p>
                        <p style={{ color: 'var(--color-text)' }}>
                          {empresa.contacto.nombre}
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-xs font-bold mb-1"
                          style={{ color: 'var(--color-gray-medium)' }}
                        >
                          Email
                        </p>
                        <a
                          href={`mailto:${empresa.contacto.email}`}
                          className="flex items-center gap-2 hover:underline"
                          style={{ color: 'var(--color-secondary)' }}
                        >
                          <IconMail size={16} />
                          {empresa.contacto.email}
                        </a>
                      </div>
                      <div>
                        <p
                          className="text-xs font-bold mb-1"
                          style={{ color: 'var(--color-gray-medium)' }}
                        >
                          Teléfono
                        </p>
                        <a
                          href={`tel:${empresa.contacto.telefono}`}
                          className="flex items-center gap-2 hover:underline"
                          style={{ color: 'var(--color-secondary)' }}
                        >
                          <IconPhone size={16} />
                          {empresa.contacto.telefono}
                        </a>
                      </div>
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
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: 'var(--color-gray-light)' }}
          >
            <IconBuildingSkyscraper
              size={48}
              style={{ color: 'var(--color-gray-medium)' }}
            />
          </div>
          <h2 style={{ color: 'var(--color-text)' }}>
            Aún no hay empresas interesadas
          </h2>
          <p
            className="mt-2 max-w-md mx-auto"
            style={{ color: 'var(--color-gray-medium)' }}
          >
            Las empresas podrán ver tu perfil una vez completes todos los
            requisitos del proceso. Continúa avanzando en tu proceso de prácticas.
          </p>
        </div>
      )}
    </div>
  );
}
