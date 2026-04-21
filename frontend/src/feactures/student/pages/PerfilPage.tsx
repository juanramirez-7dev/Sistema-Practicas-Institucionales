import { useState } from 'react';
import {
  IconUser,
  IconEdit,
  IconCheck,
  IconX,
  IconCamera,
  IconAlertCircle,
} from '@tabler/icons-react';
import { PERFIL_ESTUDIANTE } from '../../../lib/mockdata/estudiante.ts';

export function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [descripcion, setDescripcion] = useState(PERFIL_ESTUDIANTE.descripcion);
  const [foto, setFoto] = useState<string | undefined>(PERFIL_ESTUDIANTE.foto);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar formato de imagen
    const validFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validFormats.includes(file.type)) {
      setError(
        'Formato de imagen no válido. Solo se permiten archivos JPG, PNG o WEBP.'
      );
      return;
    }

    // Validar tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen es demasiado grande. Tamaño máximo: 5MB.');
      return;
    }

    setError(null);

    // Crear URL temporal para preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // Simular guardado
    setSuccessMessage('Perfil actualizado exitosamente');
    setIsEditing(false);

    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const handleCancel = () => {
    setDescripcion(PERFIL_ESTUDIANTE.descripcion);
    setFoto(PERFIL_ESTUDIANTE.foto);
    setError(null);
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 style={{ color: 'var(--color-primary)' }}>Mi Perfil</h1>
          <p style={{ color: 'var(--color-gray-medium)' }} className="mt-2">
            Información que las empresas verán sobre ti
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all hover:scale-105"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            <IconEdit size={20} />
            Editar Perfil
          </button>
        )}
      </div>

      {/* Mensaje de éxito */}
      {successMessage && (
        <div
          className="mb-6 p-4 rounded-xl flex items-center gap-3"
          style={{ backgroundColor: 'var(--color-success)', color: 'white' }}
        >
          <IconCheck size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className="mb-6 p-4 rounded-xl flex items-center gap-3"
          style={{ backgroundColor: 'var(--color-error)', color: 'white' }}
        >
          <IconAlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Columna izquierda - Foto y datos básicos */}
        <div className="md:col-span-1 space-y-6">
          {/* Foto de perfil */}
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            <div className="text-center">
              <div className="relative inline-block mb-4">
                {foto ? (
                  <img
                    src={foto}
                    alt={PERFIL_ESTUDIANTE.nombre}
                    className="w-32 h-32 rounded-full object-cover mx-auto"
                  />
                ) : (
                  <div
                    className="w-32 h-32 rounded-full flex items-center justify-center mx-auto"
                    style={{ backgroundColor: 'var(--color-gray-light)' }}
                  >
                    <IconUser size={48} style={{ color: 'var(--color-gray-medium)' }} />
                  </div>
                )}

                {isEditing && (
                  <label
                    className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <IconCamera className="text-white" size={20} />
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <h2 style={{ color: 'var(--color-primary)' }}>
                {PERFIL_ESTUDIANTE.nombre}
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: 'var(--color-gray-medium)' }}
              >
                {PERFIL_ESTUDIANTE.programa}
              </p>
            </div>
          </div>

          {/* Información académica */}
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            <h3 className="mb-4" style={{ color: 'var(--color-text)' }}>
              Información Académica
            </h3>
            <div className="space-y-3">
              <div>
                <p
                  className="text-sm font-bold"
                  style={{ color: 'var(--color-gray-medium)' }}
                >
                  Documento
                </p>
                <p style={{ color: 'var(--color-text)' }}>
                  {PERFIL_ESTUDIANTE.documento}
                </p>
              </div>
              <div>
                <p
                  className="text-sm font-bold"
                  style={{ color: 'var(--color-gray-medium)' }}
                >
                  Correo
                </p>
                <p style={{ color: 'var(--color-text)' }}>
                  {PERFIL_ESTUDIANTE.email}
                </p>
              </div>
              <div>
                <p
                  className="text-sm font-bold"
                  style={{ color: 'var(--color-gray-medium)' }}
                >
                  Semestre
                </p>
                <p style={{ color: 'var(--color-text)' }}>
                  {PERFIL_ESTUDIANTE.semestre}
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
                  {PERFIL_ESTUDIANTE.promedio.toFixed(1)}
                </p>
              </div>
              <div>
                <p
                  className="text-sm font-bold"
                  style={{ color: 'var(--color-gray-medium)' }}
                >
                  Créditos Aprobados
                </p>
                <p style={{ color: 'var(--color-text)' }}>
                  {PERFIL_ESTUDIANTE.creditos}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - Descripción y habilidades */}
        <div className="md:col-span-2 space-y-6">
          {/* Descripción */}
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            <h3 className="mb-4" style={{ color: 'var(--color-text)' }}>
              Descripción Profesional
            </h3>
            {isEditing ? (
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
                style={{
                  backgroundColor: 'var(--color-gray-light)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                }}
                placeholder="Cuéntales a las empresas sobre ti, tus intereses y objetivos..."
              />
            ) : (
              <p style={{ color: 'var(--color-gray-medium)' }}>{descripcion}</p>
            )}
          </div>

          {/* Habilidades */}
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            <h3 className="mb-4" style={{ color: 'var(--color-text)' }}>
              Habilidades Técnicas
            </h3>
            <div className="flex flex-wrap gap-2">
              {PERFIL_ESTUDIANTE.habilidades.map((habilidad) => (
                <span
                  key={habilidad}
                  className="px-4 py-2 rounded-lg font-medium"
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
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            <h3 className="mb-4" style={{ color: 'var(--color-text)' }}>
              Áreas de Interés
            </h3>
            <div className="flex flex-wrap gap-2">
              {PERFIL_ESTUDIANTE.areasInteres.map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 rounded-lg font-medium"
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

          {/* Botones de acción en modo edición */}
          {isEditing && (
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all hover:scale-[1.02]"
                style={{ backgroundColor: 'var(--color-success)' }}
              >
                <IconCheck size={20} />
                Guardar Cambios
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid var(--color-error)',
                  color: 'var(--color-error)',
                }}
              >
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
