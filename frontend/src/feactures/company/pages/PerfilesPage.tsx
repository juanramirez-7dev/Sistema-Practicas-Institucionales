import { useState } from 'react';
import {
  IconUser,
  IconSearch,
  IconFilter,
  IconX,
  IconCheck,
  IconMail,
  IconPhone,
  IconDownload,
  IconUserPlus,
  IconUserCheck,
} from '@tabler/icons-react';
import {
  ESTUDIANTES_DISPONIBLES,
  PROGRAMAS_DISPONIBLES,
  isEstudianteSeleccionado,
  type EstudianteDisponible,
} from '../../../lib/mockdata/empresa.ts';
import { useAuth } from '../../../hooks/useAuth.ts';

export function PerfilesPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [programaFiltro, setProgramaFiltro] = useState('Todos');
  const [selectedEstudiante, setSelectedEstudiante] =
    useState<EstudianteDisponible | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [seleccionados, setSeleccionados] = useState<string[]>(
    ESTUDIANTES_DISPONIBLES.filter((est) =>
      isEstudianteSeleccionado(user?.id || '', est.id)
    ).map((est) => est.id)
  );

  // Filtrar estudiantes
  const estudiantesFiltrados = ESTUDIANTES_DISPONIBLES.filter((estudiante) => {
    const matchPrograma =
      programaFiltro === 'Todos' || estudiante.programa === programaFiltro;

    const matchSearch =
      searchTerm === '' ||
      estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estudiante.habilidades.some((h) =>
        h.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      estudiante.areasInteres.some((a) =>
        a.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchPrograma && matchSearch;
  });

  const handleVerPerfil = (estudiante: EstudianteDisponible) => {
    setSelectedEstudiante(estudiante);
    setShowModal(true);
  };

  const handleSeleccionar = (estudianteId: string) => {
    if (!seleccionados.includes(estudianteId)) {
      setSeleccionados([...seleccionados, estudianteId]);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEstudiante(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ color: 'var(--color-primary)' }}>
          Perfiles de Estudiantes
        </h1>
        <p style={{ color: 'var(--color-gray-medium)' }} className="mt-2">
          Explora los perfiles de estudiantes disponibles para prácticas
          profesionales
        </p>
      </div>

      {/* Filtros */}
      <div
        className="p-6 rounded-2xl mb-6"
        style={{ backgroundColor: 'var(--color-white)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <IconFilter style={{ color: 'var(--color-primary)' }} size={24} />
          <h2 style={{ color: 'var(--color-text)' }}>Filtros de Búsqueda</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Búsqueda por palabra clave */}
          <div>
            <label
              className="block mb-2 text-sm font-bold"
              style={{ color: 'var(--color-gray-medium)' }}
            >
              Buscar por nombre o habilidades
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ej: React, Python, Juan..."
                className="w-full px-4 py-3 pl-12 rounded-xl border-2 focus:outline-none"
                style={{
                  backgroundColor: 'var(--color-gray-light)',
                  borderColor: 'var(--color-border)',
                }}
              />
              <IconSearch
                className="absolute left-4 top-1/2 -translate-y-1/2"
                size={20}
                style={{ color: 'var(--color-gray-medium)' }}
              />
            </div>
          </div>

          {/* Filtro por programa */}
          <div>
            <label
              className="block mb-2 text-sm font-bold"
              style={{ color: 'var(--color-gray-medium)' }}
            >
              Filtrar por programa
            </label>
            <select
              value={programaFiltro}
              onChange={(e) => setProgramaFiltro(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
              style={{
                backgroundColor: 'var(--color-gray-light)',
                borderColor: 'var(--color-border)',
              }}
            >
              {PROGRAMAS_DISPONIBLES.map((programa) => (
                <option key={programa} value={programa}>
                  {programa}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 flex items-center justify-between">
          <p style={{ color: 'var(--color-gray-medium)' }}>
            {estudiantesFiltrados.length}{' '}
            {estudiantesFiltrados.length === 1 ? 'perfil encontrado' : 'perfiles encontrados'}
          </p>
          {(searchTerm !== '' || programaFiltro !== 'Todos') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setProgramaFiltro('Todos');
              }}
              className="text-sm flex items-center gap-2 hover:underline"
              style={{ color: 'var(--color-secondary)' }}
            >
              <IconX size={16} />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Lista de perfiles */}
      {estudiantesFiltrados.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {estudiantesFiltrados.map((estudiante) => {
            const yaSeleccionado = seleccionados.includes(estudiante.id);

            return (
              <div
                key={estudiante.id}
                className="p-6 rounded-2xl border-2 flex flex-col"
                style={{
                  backgroundColor: 'var(--color-white)',
                  borderColor: yaSeleccionado
                    ? 'var(--color-success)'
                    : 'var(--color-border)',
                }}
              >
                {/* Foto y nombre */}
                <div className="text-center mb-4">
                  {estudiante.foto ? (
                    <img
                      src={estudiante.foto}
                      alt={estudiante.nombre}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                    />
                  ) : (
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3"
                      style={{ backgroundColor: 'var(--color-gray-light)' }}
                    >
                      <IconUser
                        size={32}
                        style={{ color: 'var(--color-gray-medium)' }}
                      />
                    </div>
                  )}
                  <h3 style={{ color: 'var(--color-primary)' }}>
                    {estudiante.nombre}
                  </h3>
                  <p
                    className="text-sm mt-1"
                    style={{ color: 'var(--color-gray-medium)' }}
                  >
                    {estudiante.programa}
                  </p>
                </div>

                {/* Información académica */}
                <div className="flex justify-around mb-4">
                  <div className="text-center">
                    <p
                      className="text-xs font-bold"
                      style={{ color: 'var(--color-gray-medium)' }}
                    >
                      Semestre
                    </p>
                    <p className="font-bold" style={{ color: 'var(--color-text)' }}>
                      {estudiante.semestre}
                    </p>
                  </div>
                  <div className="text-center">
                    <p
                      className="text-xs font-bold"
                      style={{ color: 'var(--color-gray-medium)' }}
                    >
                      Promedio
                    </p>
                    <p className="font-bold" style={{ color: 'var(--color-text)' }}>
                      {estudiante.promedio.toFixed(1)}
                    </p>
                  </div>
                </div>

                {/* Habilidades destacadas */}
                <div className="mb-4 flex-1">
                  <p
                    className="text-xs font-bold mb-2"
                    style={{ color: 'var(--color-gray-medium)' }}
                  >
                    Habilidades principales
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {estudiante.habilidades.slice(0, 3).map((habilidad) => (
                      <span
                        key={habilidad}
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: 'var(--color-secondary)',
                          color: 'white',
                        }}
                      >
                        {habilidad}
                      </span>
                    ))}
                    {estudiante.habilidades.length > 3 && (
                      <span
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: 'var(--color-gray-light)',
                          color: 'var(--color-gray-medium)',
                        }}
                      >
                        +{estudiante.habilidades.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleVerPerfil(estudiante)}
                    className="w-full px-4 py-2 rounded-xl font-bold transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'white',
                    }}
                  >
                    Ver Perfil Completo
                  </button>
                  <button
                    onClick={() => handleSeleccionar(estudiante.id)}
                    disabled={yaSeleccionado}
                    className="w-full px-4 py-2 rounded-xl font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: yaSeleccionado
                        ? 'var(--color-success)'
                        : 'var(--color-secondary)',
                      color: 'white',
                    }}
                  >
                    {yaSeleccionado ? (
                      <>
                        <IconUserCheck size={18} />
                        Seleccionado
                      </>
                    ) : (
                      <>
                        <IconUserPlus size={18} />
                        Seleccionar
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="p-12 rounded-2xl text-center"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <IconUser
            size={64}
            className="mx-auto mb-4"
            style={{ color: 'var(--color-gray-medium)' }}
          />
          <h2 style={{ color: 'var(--color-text)' }}>
            No se encontraron perfiles
          </h2>
          <p
            className="mt-2"
            style={{ color: 'var(--color-gray-medium)' }}
          >
            Intenta ajustar los filtros de búsqueda
          </p>
        </div>
      )}

      {/* Modal de perfil completo */}
      {showModal && selectedEstudiante && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div
            className="max-w-3xl w-full rounded-2xl p-8 my-8 relative max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4"
              style={{ color: 'var(--color-gray-medium)' }}
            >
              <IconX size={24} />
            </button>

            {/* Header del modal */}
            <div className="text-center mb-6">
              {selectedEstudiante.foto ? (
                <img
                  src={selectedEstudiante.foto}
                  alt={selectedEstudiante.nombre}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
              ) : (
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'var(--color-gray-light)' }}
                >
                  <IconUser size={48} style={{ color: 'var(--color-gray-medium)' }} />
                </div>
              )}
              <h2 style={{ color: 'var(--color-primary)' }}>
                {selectedEstudiante.nombre}
              </h2>
              <p style={{ color: 'var(--color-gray-medium)' }}>
                {selectedEstudiante.programa}
              </p>
            </div>

            {/* Información académica */}
            <div
              className="p-4 rounded-xl mb-6"
              style={{ backgroundColor: 'var(--color-gray-light)' }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p
                    className="text-sm font-bold"
                    style={{ color: 'var(--color-gray-medium)' }}
                  >
                    Semestre
                  </p>
                  <p style={{ color: 'var(--color-text)' }}>
                    {selectedEstudiante.semestre}
                  </p>
                </div>
                <div>
                  <p
                    className="text-sm font-bold"
                    style={{ color: 'var(--color-gray-medium)' }}
                  >
                    Promedio
                  </p>
                  <p style={{ color: 'var(--color-text)' }}>
                    {selectedEstudiante.promedio.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="mb-6">
              <h3 className="mb-2" style={{ color: 'var(--color-text)' }}>
                Sobre mí
              </h3>
              <p style={{ color: 'var(--color-gray-medium)' }}>
                {selectedEstudiante.descripcion}
              </p>
            </div>

            {/* Habilidades */}
            <div className="mb-6">
              <h3 className="mb-3" style={{ color: 'var(--color-text)' }}>
                Habilidades Técnicas
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedEstudiante.habilidades.map((habilidad) => (
                  <span
                    key={habilidad}
                    className="px-3 py-2 rounded-lg font-medium"
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
            <div className="mb-6">
              <h3 className="mb-3" style={{ color: 'var(--color-text)' }}>
                Áreas de Interés
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedEstudiante.areasInteres.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-2 rounded-lg font-medium"
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

            {/* Datos de contacto */}
            <div
              className="p-4 rounded-xl mb-6"
              style={{ backgroundColor: 'var(--color-gray-light)' }}
            >
              <h3 className="mb-3" style={{ color: 'var(--color-text)' }}>
                Datos de Contacto
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <IconMail size={18} style={{ color: 'var(--color-secondary)' }} />
                  <a
                    href={`mailto:${selectedEstudiante.email}`}
                    className="hover:underline"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {selectedEstudiante.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <IconPhone size={18} style={{ color: 'var(--color-secondary)' }} />
                  <a
                    href={`tel:${selectedEstudiante.telefono}`}
                    className="hover:underline"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {selectedEstudiante.telefono}
                  </a>
                </div>
              </div>
            </div>

            {/* Hoja de vida */}
            {selectedEstudiante.hojaVidaUrl && (
              <div className="mb-6">
                <a
                  href={selectedEstudiante.hojaVidaUrl}
                  download
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-[1.02]"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                  }}
                >
                  <IconDownload size={20} />
                  Descargar Hoja de Vida
                </a>
              </div>
            )}

            {/* Botón de selección */}
            <button
              onClick={() => {
                handleSeleccionar(selectedEstudiante.id);
                closeModal();
              }}
              disabled={seleccionados.includes(selectedEstudiante.id)}
              className="w-full px-6 py-3 rounded-xl font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                backgroundColor: seleccionados.includes(selectedEstudiante.id)
                  ? 'var(--color-success)'
                  : 'var(--color-secondary)',
                color: 'white',
              }}
            >
              {seleccionados.includes(selectedEstudiante.id) ? (
                <>
                  <IconCheck size={20} />
                  Ya Seleccionado
                </>
              ) : (
                <>
                  <IconUserPlus size={20} />
                  Seleccionar Estudiante
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
