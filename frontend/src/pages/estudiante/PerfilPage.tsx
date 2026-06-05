import { useMemo, useState } from 'react';
import {
  IconUser,
  IconEdit,
  IconCheck,
  IconX,
  IconCamera,
  IconAlertCircle,
  IconLoader,
} from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { perfilService } from '../../services/perfilService';
import type {
  PerfilProfesionalResponse,
  PerfilProfesionalUpdate,
} from '../../types/estudianteTypes';

const parseArray = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

export function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState<string>('');
  const [habilidadDraft, setHabilidadDraft] = useState('');
  const [tecnologiaDraft, setTecnologiaDraft] = useState('');
  const [habilidadesEdit, setHabilidadesEdit] = useState<string[]>([]);
  const [tecnologiasEdit, setTecnologiasEdit] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const queryClient = useQueryClient();

  const { data: perfil, isLoading, isError, error: queryError } = useQuery<PerfilProfesionalResponse, Error>({
    queryKey: ['perfilProfesional'],
    queryFn: perfilService.getPerfilProfesional,
  });

  const updateMutation = useMutation<PerfilProfesionalResponse, Error, PerfilProfesionalUpdate>({
    mutationFn: async (payload) => {
      if (!perfil) throw new Error('Perfil no disponible');
      return perfilService.updatePerfilProfesional(perfil.id, payload);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['perfilProfesional'], data);
      setSuccessMessage('Perfil actualizado exitosamente');
      setIsEditing(false);
      setDescripcion(data.descripcion || '');
      setFoto(data.urlFoto || '');
      setHabilidadDraft('');
      setTecnologiaDraft('');
      setHabilidadesEdit(parseArray(data.habilidades || ''));
      setTecnologiasEdit(parseArray(data.tecnologias || ''));
      setError(null);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    },
    onError: (error) => {
      setError(error.message || 'No se pudo actualizar el perfil.');
    },
  });

  const currentHabilidades = useMemo(() => parseArray(perfil?.habilidades ?? ''), [perfil]);
  const currentTecnologias = useMemo(() => parseArray(perfil?.tecnologias ?? ''), [perfil]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validFormats.includes(file.type)) {
      setError('Formato de imagen no válido. Solo se permiten archivos JPG, PNG o WEBP.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen es demasiado grande. Tamaño máximo: 5MB.');
      return;
    }

    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!perfil) return;

    setError(null);
    setIsSaving(true);

    try {
      await updateMutation.mutateAsync({
        descripcion,
        habilidades: habilidadesEdit.join(', '),
        tecnologias: tecnologiasEdit.join(', '),
        urlFoto: foto,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (!perfil) return;
    setDescripcion(perfil.descripcion || '');
    setFoto(perfil.urlFoto || '');
    setHabilidadDraft('');
    setTecnologiaDraft('');
    setHabilidadesEdit(currentHabilidades);
    setTecnologiasEdit(currentTecnologias);
    setError(null);
    setIsEditing(false);
  };

  const handleStartEditing = () => {
    if (!perfil) return;
    setDescripcion(perfil.descripcion || '');
    setFoto(perfil.urlFoto || '');
    setHabilidadDraft('');
    setTecnologiaDraft('');
    setHabilidadesEdit(currentHabilidades);
    setTecnologiasEdit(currentTecnologias);
    setError(null);
    setIsEditing(true);
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-8 text-center" style={{ color: 'var(--color-gray-medium)' }}>
        <div className="flex items-center justify-center gap-3">
          <IconLoader className="animate-spin" size={24} />
          Cargando perfil profesional...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-5xl mx-auto p-8 rounded-2xl" style={{ backgroundColor: 'var(--color-white)' }}>
        <p style={{ color: 'var(--color-error)' }}>No se pudo cargar el perfil.</p>
        <p style={{ color: 'var(--color-gray-medium)' }}>{queryError?.message}</p>
      </div>
    );
  }

  if (!perfil) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 style={{ color: 'var(--color-primary)' }}>Mi Perfil</h1>
          <p style={{ color: 'var(--color-gray-medium)' }} className="mt-2">
            Información que las empresas verán sobre ti
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={handleStartEditing}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all hover:scale-105"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            <IconEdit size={20} />
            Editar Perfil
          </button>
        )}
      </div>

      {successMessage && (
        <div className="mb-6 p-4 rounded-xl flex items-center gap-3" style={{ backgroundColor: 'var(--color-success)', color: 'white' }}>
          <IconCheck size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl flex items-center gap-3" style={{ backgroundColor: 'var(--color-error)', color: 'white' }}>
          <IconAlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--color-white)' }}>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                {(isEditing && foto) || (!isEditing && perfil.urlFoto) ? (
                  <img
                    src={isEditing ? foto : perfil.urlFoto!}
                    alt={perfil.nombre}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="w-32 h-32 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-gray-light)' }}
                  >
                    <IconUser size={48} style={{ color: 'var(--color-gray-medium)' }} />
                  </div>
                )}

                {isEditing && (
                  <label
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 flex items-center justify-center gap-2 px-3 py-2 rounded-full cursor-pointer transition-all hover:scale-105"
                    style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}
                  >
                    <IconCamera size={16} />
                    <span className="text-xs font-bold">Subir</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <h2 style={{ color: 'var(--color-primary)' }}>{perfil.nombre}</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--color-gray-medium)' }}>
                {perfil.carrera}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--color-white)' }}>
            <h3 className="mb-4" style={{ color: 'var(--color-text)' }}>
              Información de contacto
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--color-gray-medium)' }}>
                  Correo
                </p>
                <p className="break-words text-sm" style={{ color: 'var(--color-text)' }}>{perfil.correo}</p>
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--color-gray-medium)' }}>
                  Teléfono
                </p>
                <p className="break-words text-sm" style={{ color: 'var(--color-text)' }}>{perfil.telefono}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--color-white)' }}>
            <h3 className="mb-4" style={{ color: 'var(--color-text)' }}>
              Descripción Profesional
            </h3>
            {isEditing ? (
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={6} className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none" style={{ backgroundColor: 'var(--color-gray-light)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Cuéntales a las empresas sobre ti, tus intereses y objetivos..." />
            ) : (
              <p style={{ color: 'var(--color-gray-medium)' }}>{perfil.descripcion || ''}</p>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--color-white)' }}>
              <h3 className="mb-4" style={{ color: 'var(--color-text)' }}>
                Habilidades
              </h3>
              {isEditing ? (
                <>
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <input
                      value={habilidadDraft}
                      onChange={(e) => setHabilidadDraft(e.target.value)}
                      type="text"
                      placeholder="Agregar habilidad"
                      className="flex-1 px-4 py-3 rounded-xl border-2 focus:outline-none"
                      style={{ backgroundColor: 'var(--color-gray-light)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const next = habilidadDraft.trim();
                        if (!next) return;
                        if (!habilidadesEdit.includes(next)) {
                          setHabilidadesEdit([...habilidadesEdit, next]);
                        }
                        setHabilidadDraft('');
                      }}
                      className="px-5 py-3 rounded-xl font-bold text-white"
                      style={{ backgroundColor: 'var(--color-secondary)' }}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {habilidadesEdit.length > 0 ? (
                      habilidadesEdit.map((habilidad) => (
                        <span key={habilidad} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm" style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}>
                          {habilidad}
                          <button type="button" onClick={() => setHabilidadesEdit(habilidadesEdit.filter((item) => item !== habilidad))} className="text-white">
                            <IconX size={14} />
                          </button>
                        </span>
                      ))
                    ) : (
                      <p className="text-sm" style={{ color: 'var(--color-gray-medium)' }}>Agrega tus habilidades una por una.</p>
                    )}
                  </div>
                </>
              ) : currentHabilidades.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {currentHabilidades.map((habilidad) => (
                    <span key={habilidad} className="px-4 py-2 rounded-lg font-medium" style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}>
                      {habilidad}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--color-gray-medium)' }}>No hay habilidades registradas.</p>
              )}
            </div>

            <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--color-white)' }}>
              <h3 className="mb-4" style={{ color: 'var(--color-text)' }}>
                Tecnologías
              </h3>
              {isEditing ? (
                <>
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <input
                      value={tecnologiaDraft}
                      onChange={(e) => setTecnologiaDraft(e.target.value)}
                      type="text"
                      placeholder="Agregar tecnología"
                      className="flex-1 px-4 py-3 rounded-xl border-2 focus:outline-none"
                      style={{ backgroundColor: 'var(--color-gray-light)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const next = tecnologiaDraft.trim();
                        if (!next) return;
                        if (!tecnologiasEdit.includes(next)) {
                          setTecnologiasEdit([...tecnologiasEdit, next]);
                        }
                        setTecnologiaDraft('');
                      }}
                      className="px-5 py-3 rounded-xl font-bold text-white"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tecnologiasEdit.length > 0 ? (
                      tecnologiasEdit.map((tecnologia) => (
                        <span key={tecnologia} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                          {tecnologia}
                          <button type="button" onClick={() => setTecnologiasEdit(tecnologiasEdit.filter((item) => item !== tecnologia))} className="text-white">
                            <IconX size={14} />
                          </button>
                        </span>
                      ))
                    ) : (
                      <p className="text-sm" style={{ color: 'var(--color-gray-medium)' }}>Agrega tus tecnologías una por una.</p>
                    )}
                  </div>
                </>
              ) : currentTecnologias.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {currentTecnologias.map((tecnologia) => (
                    <span key={tecnologia} className="px-4 py-2 rounded-lg font-medium" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                      {tecnologia}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--color-gray-medium)' }}>No hay tecnologías registradas.</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex flex-col gap-4 sm:flex-row">
              <button onClick={handleSave} disabled={isSaving} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundColor: 'var(--color-success)' }}>
                <IconCheck size={20} />
                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
              <button onClick={handleCancel} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-[1.02]" style={{ backgroundColor: 'transparent', border: '2px solid var(--color-error)', color: 'var(--color-error)' }}>
                <IconX size={20} />
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
