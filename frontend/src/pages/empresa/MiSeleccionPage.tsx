import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  IconUser,
  IconMail,
  IconPhone,
  IconUserCheck,
  IconTrash,
  IconAlertCircle,
} from '@tabler/icons-react';
import { perfilService } from '../../services/perfilService';

export function MiSeleccionPage() {
  const queryClient = useQueryClient();
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);

  const seleccionesQuery = useQuery({
    queryKey: ['seleccionesEmpresa'],
    queryFn: () => perfilService.getSeleccionPerfilEmpresa(),
  });

  const deleteMutation = useMutation<void, unknown, string>({
    mutationFn: (seleccionId: string) => perfilService.deleteSeleccionPerfil(seleccionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seleccionesEmpresa'] });
    },
    onError: () => {
      setErrorMensaje('No se pudo quitar la selección. Intenta nuevamente.');
    },
  });

  const estudiantesSeleccionados = seleccionesQuery.data?.selecciones || [];
  const totalSeleccionados = seleccionesQuery.data?.totalSeleccionados ?? estudiantesSeleccionados.length;
  const isLoading = seleccionesQuery.isLoading;
  const isError = seleccionesQuery.isError;

  const handleQuitarSeleccion = async (seleccionId: string) => {
    setErrorMensaje(null);
    await deleteMutation.mutateAsync(seleccionId);
  };

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
              {totalSeleccionados}
            </h2>
          </div>
        </div>
      </div>

      {isError && (
        <div
          className="p-6 rounded-2xl mb-6 flex items-start gap-4"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <IconAlertCircle size={24} style={{ color: 'var(--color-danger)' }} />
          <div>
            <p className="font-bold" style={{ color: 'var(--color-text)' }}>
              No se pudieron cargar las selecciones.
            </p>
            <p style={{ color: 'var(--color-gray-medium)' }}>
              {errorMensaje || 'Intenta actualizar la página.'}
            </p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div
          className="p-12 rounded-2xl text-center"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <p style={{ color: 'var(--color-gray-medium)' }}>Cargando selecciones...</p>
        </div>
      ) : estudiantesSeleccionados.length > 0 ? (
        <div className="space-y-6">
          {estudiantesSeleccionados.map((estudiante) => (
            <div
              key={estudiante.seleccionId}
              className="p-6 rounded-2xl border-2"
              style={{
                backgroundColor: 'var(--color-white)',
                borderColor: 'var(--color-success)',
              }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="shrink-0">
                  {estudiante.urlFoto ? (
                    <img
                      src={estudiante.urlFoto}
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
                        {estudiante.carrera}
                      </p>
                      <p
                        className="text-xs mt-2"
                        style={{ color: 'var(--color-gray-medium)' }}
                      >
                        Seleccionado el {new Date(estudiante.fechaSeleccion).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleQuitarSeleccion(estudiante.seleccionId)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        border: '1px solid var(--color-primary)',
                      }}
                    >
                      <IconTrash size={18} />
                      Quitar selección
                    </button>
                  </div>

                  <p
                    className="mb-4"
                    style={{ color: 'var(--color-gray-medium)' }}
                  >
                    {estudiante.descripcion}
                  </p>

                  <div className="mb-4">
                    <p
                      className="text-xs font-bold mb-2"
                      style={{ color: 'var(--color-gray-medium)' }}
                    >
                      Habilidades
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {estudiante.habilidades.split(',').map((habilidad) => (
                        <span
                          key={habilidad}
                          className="text-sm px-3 py-1 rounded"
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

                  <div className="mb-4">
                    <p
                      className="text-xs font-bold mb-2"
                      style={{ color: 'var(--color-gray-medium)' }}
                    >
                      Tecnologías
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {estudiante.tecnologias.split(',').map((tech) => (
                        <span
                          key={tech}
                          className="text-sm px-3 py-1 rounded"
                          style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                          }}
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

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
                            href={`mailto:${estudiante.correo}`}
                            className="text-sm hover:underline"
                            style={{ color: 'var(--color-text)' }}
                          >
                            {estudiante.correo}
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
