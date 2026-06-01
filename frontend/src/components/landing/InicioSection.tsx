import { useState } from 'react';
import {
  IconSearch,
  IconCheck,
  IconX,
  IconAlertCircle,
  IconRocket,
} from '@tabler/icons-react';

// Mock data para simular la base de datos de estudiantes
const MOCK_STUDENTS = {
  '1234567890': {
    nombre: 'Juan Pérez García',
    cumpleRequisitos: true,
    requisitos: {
      creditosAprobados: { cumple: true, valor: 120, minimo: 100 },
      promedioMinimo: { cumple: true, valor: 3.8, minimo: 3.5 },
      documentosAlDia: { cumple: true },
    },
    tieneProcesoActivo: false,
  },
  '9876543210': {
    nombre: 'María González López',
    cumpleRequisitos: false,
    requisitos: {
      creditosAprobados: { cumple: false, valor: 85, minimo: 100 },
      promedioMinimo: { cumple: true, valor: 4.0, minimo: 3.5 },
      documentosAlDia: { cumple: false },
    },
    tieneProcesoActivo: false,
  },
  '5555555555': {
    nombre: 'Carlos Rodríguez Sánchez',
    cumpleRequisitos: true,
    requisitos: {
      creditosAprobados: { cumple: true, valor: 110, minimo: 100 },
      promedioMinimo: { cumple: true, valor: 3.9, minimo: 3.5 },
      documentosAlDia: { cumple: true },
    },
    tieneProcesoActivo: true,
  },
};

type ConsultaStatus = 'idle' | 'notFound' | 'found' | 'processCreated';

export function InicioSection() {
  const [documento, setDocumento] = useState('');
  const [status, setStatus] = useState<ConsultaStatus>('idle');
  const [studentData, setStudentData] = useState<
    (typeof MOCK_STUDENTS)[keyof typeof MOCK_STUDENTS] | null
  >(null);

  const handleConsulta = (e: React.FormEvent) => {
    e.preventDefault();

    // Simular consulta a la base de datos
    const student = MOCK_STUDENTS[documento as keyof typeof MOCK_STUDENTS];

    if (!student) {
      setStatus('notFound');
      setStudentData(null);
    } else {
      setStatus('found');
      setStudentData(student);
    }
  };

  const handleIniciarProceso = () => {
    setStatus('processCreated');
  };

  const resetForm = () => {
    setDocumento('');
    setStatus('idle');
    setStudentData(null);
  };

  return (
    <section
      id="inicio"
      className="min-h-screen pt-32 pb-16 px-6"
      style={{ backgroundColor: 'var(--color-gray-light)' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Título y descripción */}
        <div className="text-center mb-12">
          <h1
            className="mb-4"
            style={{ color: 'var(--color-primary)' }}
          >
            Sistema de Gestión de Prácticas Profesionales
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--color-gray-medium)' }}
          >
            Consulta si cumples los requisitos mínimos para iniciar tu proceso
            de prácticas profesionales en el ITM
          </p>
        </div>

        {/* Formulario de consulta */}
        <div
          className="rounded-2xl p-8 shadow-lg"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <form onSubmit={handleConsulta} className="space-y-6">
            <div>
              <label
                htmlFor="documento"
                className="block mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                Número de Documento de Identidad
              </label>
              <div className="relative">
                <input
                  id="documento"
                  type="text"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  placeholder="Ingresa tu número de documento"
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{
                    backgroundColor: 'var(--color-gray-light)',
                    borderColor: 'var(--color-border)',
                  }}
                  required
                />
                <IconSearch
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  size={20}
                  style={{ color: 'var(--color-gray-medium)' }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-xl text-white font-bold transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              Consultar Elegibilidad
            </button>
          </form>

          {/* Resultados */}
          {status === 'notFound' && (
            <div
              className="mt-6 p-6 rounded-xl border-2"
              style={{
                backgroundColor: 'var(--color-error)',
                borderColor: 'var(--color-error)',
              }}
            >
              <div className="flex items-start gap-3">
                <IconAlertCircle className="text-white flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-white font-bold mb-2">
                    Documento no encontrado
                  </h3>
                  <p className="text-white/90">
                    No existe información asociada al número de documento
                    ingresado. Por favor verifica e intenta nuevamente.
                  </p>
                  <button
                    onClick={resetForm}
                    className="mt-4 px-4 py-2 bg-white rounded-lg font-bold"
                    style={{ color: 'var(--color-error)' }}
                  >
                    Intentar de nuevo
                  </button>
                </div>
              </div>
            </div>
          )}

          {status === 'found' && studentData && (
            <div className="mt-6 space-y-4">
              {/* Información del estudiante */}
              <div
                className="p-6 rounded-xl"
                style={{ backgroundColor: 'var(--color-gray-light)' }}
              >
                <h3
                  className="font-bold mb-2"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Estudiante: {studentData.nombre}
                </h3>
                <p style={{ color: 'var(--color-gray-medium)' }}>
                  Documento: {documento}
                </p>
              </div>

              {/* Estado de requisitos */}
              <div
                className="p-6 rounded-xl border-2"
                style={{
                  backgroundColor: studentData.cumpleRequisitos
                    ? 'var(--color-success)'
                    : 'var(--color-warning)',
                  borderColor: studentData.cumpleRequisitos
                    ? 'var(--color-success)'
                    : 'var(--color-warning)',
                }}
              >
                <div className="flex items-start gap-3">
                  {studentData.cumpleRequisitos ? (
                    <IconCheck className="text-white flex-shrink-0" size={28} />
                  ) : (
                    <IconX className="text-white flex-shrink-0" size={28} />
                  )}
                  <div className="flex-1">
                    <h3 className="text-white font-bold mb-3">
                      {studentData.cumpleRequisitos
                        ? '¡Felicitaciones! Cumples los requisitos mínimos'
                        : 'No cumples los requisitos mínimos'}
                    </h3>

                    {/* Detalle de requisitos */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white">
                        {studentData.requisitos.creditosAprobados.cumple ? (
                          <IconCheck size={18} />
                        ) : (
                          <IconX size={18} />
                        )}
                        <span className="text-sm">
                          Créditos aprobados: {studentData.requisitos.creditosAprobados.valor}/
                          {studentData.requisitos.creditosAprobados.minimo}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        {studentData.requisitos.promedioMinimo.cumple ? (
                          <IconCheck size={18} />
                        ) : (
                          <IconX size={18} />
                        )}
                        <span className="text-sm">
                          Promedio mínimo: {studentData.requisitos.promedioMinimo.valor}/
                          {studentData.requisitos.promedioMinimo.minimo}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        {studentData.requisitos.documentosAlDia.cumple ? (
                          <IconCheck size={18} />
                        ) : (
                          <IconX size={18} />
                        )}
                        <span className="text-sm">Documentos al día</span>
                      </div>
                    </div>

                    {/* Botón de acción */}
                    {studentData.cumpleRequisitos && !studentData.tieneProcesoActivo && (
                      <button
                        onClick={handleIniciarProceso}
                        className="mt-4 px-6 py-3 bg-white rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all"
                        style={{ color: 'var(--color-secondary)' }}
                      >
                        <IconRocket size={20} />
                        Iniciar Proceso
                      </button>
                    )}

                    {studentData.tieneProcesoActivo && (
                      <div className="mt-4 p-4 bg-white/20 rounded-xl text-white">
                        <p className="font-bold">
                          Ya tienes un proceso activo
                        </p>
                        <p className="text-sm mt-1">
                          Ya cuentas con una solicitud en curso. No es necesario
                          iniciar un nuevo proceso.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={resetForm}
                className="w-full px-6 py-3 rounded-xl font-bold transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid var(--color-gray-medium)',
                  color: 'var(--color-text)',
                }}
              >
                Realizar otra consulta
              </button>
            </div>
          )}

          {status === 'processCreated' && (
            <div
              className="mt-6 p-6 rounded-xl border-2"
              style={{
                backgroundColor: 'var(--color-success)',
                borderColor: 'var(--color-success)',
              }}
            >
              <div className="flex items-start gap-3">
                <IconCheck className="text-white flex-shrink-0" size={28} />
                <div>
                  <h3 className="text-white font-bold mb-2">
                    ¡Proceso iniciado exitosamente!
                  </h3>
                  <p className="text-white/90 mb-4">
                    Tu cuenta ha sido activada. Ahora puedes ingresar al sistema
                    con las siguientes credenciales:
                  </p>
                  <div className="bg-white/20 p-4 rounded-lg space-y-2 text-white">
                    <p className="text-sm">
                      <strong>Correo institucional:</strong> {studentData?.nombre.toLowerCase().replace(/ /g, '.')}@itm.edu.co
                    </p>
                    <p className="text-sm">
                      <strong>Contraseña:</strong> {documento}
                    </p>
                  </div>
                  <button
                    onClick={resetForm}
                    className="mt-4 px-4 py-2 bg-white rounded-lg font-bold"
                    style={{ color: 'var(--color-success)' }}
                  >
                    Realizar otra consulta
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ayuda */}
        <div className="mt-8 text-center">
          <p style={{ color: 'var(--color-gray-medium)' }}>
            Ejemplos de documentos para probar:
            <span className="font-bold mx-2">1234567890</span>
            (cumple requisitos),
            <span className="font-bold mx-2">9876543210</span>
            (no cumple),
            <span className="font-bold mx-2">5555555555</span>
            (proceso activo)
          </p>
        </div>
      </div>
    </section>
  );
}
