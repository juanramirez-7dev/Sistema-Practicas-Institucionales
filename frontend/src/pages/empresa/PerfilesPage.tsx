import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  IconUser,
  IconSearch,
  IconFilter,
  IconX,
  IconCheck,
  IconMail,
  IconPhone,
  IconUserPlus,
  IconUserCheck,
  IconAlertCircle,
  IconEye
} from '@tabler/icons-react';
import { perfilService } from '../../services/perfilService';
import type { PerfilDisponible } from '../../types/estudianteTypes';

// TODO: Actualiza esta lista con las carreras disponibles del backend o datos maestros
const CARRERAS_DISPONIBLES: string[] =  [
  "Tecnologia en Electronica",
  "Tecnologia en Telecomunicaciones",
  "Tecnologia en Electromecanica",
  "Tecnologia en Mantenimiento Biomedico",
  "Tecnologia en Produccion",
  "Ingenieria Electronica",
  "Ingenieria de Telecomunicaciones",
  "Ingenieria Electromecanica",
  "Ingenieria Mecatronica",
  "Ingenieria de Produccion"
];

export function PerfilesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedEstudiante, setSelectedEstudiante] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const [exitoMensaje, setExitoMensaje] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const searchTerm = searchParams.get('textoBusqueda') || '';
  const carreraFiltro = searchParams.get('carrera') || 'Todos';

  // Limpiar mensajes después de 3 segundos
  useEffect(() => {
    if (errorMensaje) {
      const timer = setTimeout(() => setErrorMensaje(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMensaje]);

  useEffect(() => {
    if (exitoMensaje) {
      const timer = setTimeout(() => setExitoMensaje(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [exitoMensaje]);

  const handleSearchChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('textoBusqueda', value);
    } else {
      newParams.delete('textoBusqueda');
    }
    setSearchParams(newParams);
  };

  const handleCarreraChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value !== 'Todos') {
      newParams.set('carrera', value);
    } else {
      newParams.delete('carrera');
    }
    setSearchParams(newParams);
  };

  const handleLimpiarFiltros = () => {
    setSearchParams(new URLSearchParams());
  };

  const perfilesQuery = useQuery({
    queryKey: ['perfilesDisponibles', searchTerm, carreraFiltro],
    queryFn: () =>
      perfilService.getPerfilesDisponibles(
        searchTerm || undefined,
        carreraFiltro !== 'Todos' ? carreraFiltro : undefined
      ),
  });

  const detalleQuery = useQuery({
    queryKey: ['perfilDetalle', selectedEstudiante],
    queryFn: () =>
      selectedEstudiante
        ? perfilService.getDetallePerfilEstudiante(selectedEstudiante)
        : null,
    enabled: !!selectedEstudiante,
  });

  const seleccionarMutation = useMutation({
    mutationFn: (estudianteId: string) =>
      perfilService.seleccionarPerfil({ EstudianteId: estudianteId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['perfilesDisponibles'] });
      setExitoMensaje('¡Perfil seleccionado exitosamente!');
    },
    onError: (error) => {
      const errorMsg =
        error?.message ||
        'Error al seleccionar el perfil. Intenta nuevamente.';
      setErrorMensaje(errorMsg);
    },
  });

  const handleVerPerfil = (estudiante: PerfilDisponible) => {
    setSelectedEstudiante(estudiante.estudianteId);
    setShowModal(true);
  };

  const handleSeleccionar = async (estudianteId: string) => {
    setErrorMensaje(null);
    await seleccionarMutation.mutateAsync(estudianteId);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEstudiante(null);
  };

  const estudiantesFiltrados = perfilesQuery.data?.perfiles || [];
  const isLoading = perfilesQuery.isLoading;
  const isError = perfilesQuery.isError;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Mensaje de éxito */}
      {exitoMensaje && (
        <div
          className="p-4 rounded-xl mb-6 flex items-center gap-2"
          style={{ backgroundColor: '#DCFCE7', color: 'var(--color-success)' }}
        >
          <IconCheck size={20} />
          <p>{exitoMensaje}</p>
        </div>
      )}

      {/* Mensaje de error */}
      {errorMensaje && (
        <div
          className="p-4 rounded-xl mb-6 flex items-center gap-2"
          style={{ backgroundColor: '#FEE2E2', color: 'var(--color-error)' }}
        >
          <IconAlertCircle size={20} />
          <p>{errorMensaje}</p>
        </div>
      )}
      
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
                onChange={(e) => handleSearchChange(e.target.value)}
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

          {/* Filtro por carrera */}
          <div>
            <label
              className="block mb-2 text-sm font-bold"
              style={{ color: 'var(--color-gray-medium)' }}
            >
              Filtrar por carrera
            </label>
            <select
              value={carreraFiltro}
              onChange={(e) => handleCarreraChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
              style={{
                backgroundColor: 'var(--color-gray-light)',
                borderColor: 'var(--color-border)',
              }}
            >
              {CARRERAS_DISPONIBLES.map((carrera) => (
                <option key={carrera} value={carrera}>
                  {carrera}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 flex items-center justify-between">
          <p style={{ color: 'var(--color-gray-medium)' }}>
            {isLoading
              ? 'Cargando...'
              : `${estudiantesFiltrados.length} ${
                  estudiantesFiltrados.length === 1
                    ? 'perfil encontrado'
                    : 'perfiles encontrados'
                }`}
          </p>
          {(searchTerm !== '' || carreraFiltro !== 'Todos') && (
            <button
              onClick={handleLimpiarFiltros}
              className="text-sm flex items-center gap-2 hover:underline"
              style={{ color: 'var(--color-secondary)' }}
            >
              <IconX size={16} />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Estado de carga y error */}
      {isError && (
        <div
          className="p-4 rounded-xl mb-6"
          style={{ backgroundColor: '#FEE2E2', color: 'var(--color-error)' }}
        >
          <div className="flex items-center gap-2">
            <IconAlertCircle size={20} />
            <p>No se pudieron cargar los perfiles. Intenta nuevamente.</p>
          </div>
        </div>
      )}

      {/* Lista de perfiles */}
      {isLoading ? (
        <div
          className="p-12 rounded-2xl text-center"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <p style={{ color: 'var(--color-gray-medium)' }}>Cargando perfiles...</p>
        </div>
      ) : estudiantesFiltrados.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {estudiantesFiltrados.map((estudiante) => {
            return (
              <div
                key={estudiante.estudianteId}
                className="p-6 rounded-2xl border-2 flex flex-col"
                style={{
                  backgroundColor: 'var(--color-white)',
                  borderColor: estudiante.seleccionado
                    ? 'var(--color-success)'
                    : 'var(--color-border)',
                }}
              >
                {/* Foto y nombre */}
                <div className="text-center mb-4">
                  {estudiante.urlFoto ? (
                    <img
                      src={estudiante.urlFoto}
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
                    {estudiante.carrera}
                  </p>
                </div>

                {/* Habilidades destacadas */}
                <div className="mb-4 flex-1">
                  <p
                    className="text-xs font-bold mb-2"
                    style={{ color: 'var(--color-gray-medium)' }}
                  >
                    Habilidades
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {estudiante.habilidades
                      .split(',')
                      .slice(0, 3)
                      .map((habilidad) => (
                        <span
                          key={habilidad.trim()}
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            backgroundColor: 'var(--color-secondary)',
                            color: 'white',
                          }}
                        >
                          {habilidad.trim()}
                        </span>
                      ))}
                    {estudiante.habilidades.split(',').length > 3 && (
                      <span
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: 'var(--color-gray-light)',
                          color: 'var(--color-gray-medium)',
                        }}
                      >
                        +{estudiante.habilidades.split(',').length - 3}
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
                    onClick={() => handleSeleccionar(estudiante.estudianteId)}
                    disabled={estudiante.seleccionado || seleccionarMutation.isPending}
                    className="w-full px-4 py-2 rounded-xl font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: estudiante.seleccionado
                        ? 'var(--color-success)'
                        : 'var(--color-secondary)',
                      color: 'white',
                    }}
                  >
                    {seleccionarMutation.isPending ? (
                      <>
                        
                        Seleccionando...
                      </>
                    ) : estudiante.seleccionado ? (
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
      {showModal && detalleQuery.data && (
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
              {detalleQuery.data.urlFoto ? (
                <img
                  src={detalleQuery.data.urlFoto}
                  alt={detalleQuery.data.nombre}
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
                {detalleQuery.data.nombre}
              </h2>
              <p style={{ color: 'var(--color-gray-medium)' }}>
                {detalleQuery.data.carrera}
              </p>
            </div>

            {/* Descripción */}
            <div className="mb-6">
              <h3 className="mb-2" style={{ color: 'var(--color-text)' }}>
                Sobre mí
              </h3>
              <p style={{ color: 'var(--color-gray-medium)' }}>
                {detalleQuery.data.descripcion}
              </p>
            </div>

            {/* Habilidades */}
            {detalleQuery.data.habilidades && (
              <div className="mb-6">
                <h3 className="mb-3" style={{ color: 'var(--color-text)' }}>
                  Habilidades Técnicas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {detalleQuery.data.habilidades
                    .split(',')
                    .map((habilidad) => (
                      <span
                        key={habilidad.trim()}
                        className="px-3 py-2 rounded-lg font-medium"
                        style={{
                          backgroundColor: 'var(--color-secondary)',
                          color: 'white',
                        }}
                      >
                        {habilidad.trim()}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Tecnologías */}
            {detalleQuery.data.tecnologias && (
              <div className="mb-6">
                <h3 className="mb-3" style={{ color: 'var(--color-text)' }}>
                  Tecnologías
                </h3>
                <div className="flex flex-wrap gap-2">
                  {detalleQuery.data.tecnologias
                    .split(',')
                    .map((tecnologia) => (
                      <span
                        key={tecnologia.trim()}
                        className="px-3 py-2 rounded-lg font-medium"
                        style={{
                          backgroundColor: 'var(--color-primary)',
                          color: 'white',
                        }}
                      >
                        {tecnologia.trim()}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Datos de contacto */}
            <div
              className="p-4 rounded-xl"
              style={{ backgroundColor: 'var(--color-gray-light)' }}
            >
              <h3 className="mb-3" style={{ color: 'var(--color-text)' }}>
                Datos de Contacto
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <IconMail size={18} style={{ color: 'var(--color-secondary)' }} />
                  <a
                    href={`mailto:${detalleQuery.data.correo}`}
                    className="hover:underline"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {detalleQuery.data.correo}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <IconPhone size={18} style={{ color: 'var(--color-secondary)' }} />
                  <a
                    href={`tel:${detalleQuery.data.telefono}`}
                    className="hover:underline"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {detalleQuery.data.telefono}
                  </a>
                </div>
                {detalleQuery.data.urlHojaVida && (
                  <div className="mt-4">
                    <a
                      href={detalleQuery.data.urlHojaVida}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                      }}
                    >
                      <IconEye size={18} />
                      Ver Hoja de Vida
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de carga del detalle */}
      {showModal && detalleQuery.isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className="p-8 rounded-2xl"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            <p style={{ color: 'var(--color-gray-medium)' }}>Cargando detalles...</p>
          </div>
        </div>
      )}
    </div>
  );
}
