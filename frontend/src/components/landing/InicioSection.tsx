import { useState } from 'react';
import {
  IconSearch,
  IconCheck,
  IconX,
  IconAlertCircle,
  IconRocket,
  IconLoader,
} from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { estudianteService } from '../../services/estudianteService';
import type {
  UsuarioResponse,
  ValidateCreditsResponse,
} from '../../types/estudianteTypes';

type ConsultaStatus = 'idle' | 'notFound' | 'found' | 'processCreated';

export function InicioSection() {
  const [documento, setDocumento] = useState('');
  const [status, setStatus] = useState<ConsultaStatus>('idle');
  const [validationData, setValidationData] = useState<ValidateCreditsResponse | null>(null);
  const [createdUser, setCreatedUser] = useState<UsuarioResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationQuery = useQuery<ValidateCreditsResponse, Error>({
    queryKey: ['estudiante', documento],
    queryFn: () => estudianteService.validateCredits(documento),
    enabled: false,
  });

  const startProcessMutation = useMutation<UsuarioResponse, Error, string>({
    mutationFn: (documento) => estudianteService.startProcess(documento),
    onSuccess: (data) => {
      setCreatedUser(data);
      setStatus('processCreated');
      setErrorMessage(null);
    },
    onError: (error) => {
      setErrorMessage(error.message || 'No se pudo iniciar el proceso.');
    },
  });

  const handleConsulta = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setErrorMessage(null);
    setCreatedUser(null);

    if (!documento.trim()) {
      setErrorMessage('Ingresa un número de documento válido.');
      return;
    }

    const result = await validationQuery.refetch();

    if (result.data) {
      setValidationData(result.data);
      setStatus('found');
      return;
    }

    const message = result.error?.message.toLowerCase() || '';
    if (message.includes('no encontrado') || message.includes('not found')) {
      setStatus('notFound');
      setValidationData(null);
      return;
    }

    setValidationData(null);
    setErrorMessage(result.error?.message || 'No se pudo consultar el documento.');
  };

  const handleIniciarProceso = async () => {
    if (!validationData?.meetsRequirement) return;
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await startProcessMutation.mutateAsync(documento);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setDocumento('');
    setStatus('idle');
    setValidationData(null);
    setCreatedUser(null);
    setErrorMessage(null);
  };

  return (
    <section
      id="inicio"
      className="min-h-screen pt-32 pb-16 px-6"
      style={{ backgroundColor: 'var(--color-gray-light)' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="mb-4" style={{ color: 'var(--color-primary)' }}>
            Sistema de Gestión de Prácticas Profesionales
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-gray-medium)' }}>
            Consulta si cumples los requisitos mínimos para iniciar tu proceso
            de prácticas profesionales en el ITM
          </p>
        </div>

        <div className="rounded-2xl p-8 shadow-lg" style={{ backgroundColor: 'var(--color-white)' }}>
          <form onSubmit={handleConsulta} className="space-y-6">
            <div>
              <label htmlFor="documento" className="block mb-2" style={{ color: 'var(--color-text)' }}>
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
                <IconSearch className="absolute right-4 top-1/2 -translate-y-1/2" size={20} style={{ color: 'var(--color-gray-medium)' }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={validationQuery.isFetching}
              className="w-full px-6 py-3 rounded-xl text-white font-bold transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              {validationQuery.isFetching ? (
                <span className="flex items-center justify-center gap-2">
                  <IconLoader className="animate-spin" size={18} />
                  Consultando...
                </span>
              ) : (
                'Consultar Elegibilidad'
              )}
            </button>
          </form>

          {errorMessage && (
            <div className="mt-6 p-4 rounded-xl flex items-start gap-3" style={{ backgroundColor: 'var(--color-error)', color: 'white' }}>
              <IconAlertCircle size={20} className="shrink-0 mt-0.5" />
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          {status === 'notFound' && (
            <div className="mt-6 p-6 rounded-xl border-2" style={{ backgroundColor: 'var(--color-error)', borderColor: 'var(--color-error)' }}>
              <div className="flex items-start gap-3">
                <IconAlertCircle className="text-white shrink-0" size={24} />
                <div>
                  <h3 className="text-white font-bold mb-2">Documento no encontrado</h3>
                  <p className="text-white/90">
                    No existe información asociada al número de documento ingresado. Por favor verifica e intenta nuevamente.
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

          {status === 'found' && validationData && (
            <div className="mt-6 space-y-4">
              <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-gray-light)' }}>
                <h3 className="font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                  Documento: {documento}
                </h3>
                <p style={{ color: 'var(--color-gray-medium)' }}>
                  Resultado de elegibilidad de créditos
                </p>
              </div>

              <div className="p-6 rounded-xl border-2" style={{ backgroundColor: validationData.meetsRequirement ? 'var(--color-success)' : 'var(--color-warning)', borderColor: validationData.meetsRequirement ? 'var(--color-success)' : 'var(--color-warning)' }}>
                <div className="flex items-start gap-3">
                  {validationData.meetsRequirement ? (
                    <IconCheck className="text-white shrink-0" size={28} />
                  ) : (
                    <IconX className="text-white shrink-0" size={28} />
                  )}
                  <div className="flex-1">
                    <h3 className="text-white font-bold mb-3">
                      {validationData.meetsRequirement
                        ? '¡Cumples con los créditos necesarios para iniciar el proceso!'
                        : 'No cumples con los créditos necesarios para iniciar el proceso'}
                    </h3>

                    <div className="space-y-3 text-white">
                      <div>
                        <p className="text-sm text-white/80">Créditos aprobados</p>
                        <p className="text-lg font-bold">{validationData.approvedCredits}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/80">Créditos requeridos</p>
                        <p className="text-lg font-bold">{validationData.requiredCredits}</p>
                      </div>
                      {!validationData.meetsRequirement && (
                        <div>
                          <p className="text-sm text-white/80">Créditos faltantes</p>
                          <p className="text-lg font-bold">{validationData.missingCredits}</p>
                        </div>
                      )}
                    </div>

                    {validationData.meetsRequirement && (
                      <button
                        onClick={handleIniciarProceso}
                        disabled={isSubmitting}
                        className="mt-4 px-6 py-3 bg-white rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ color: 'var(--color-secondary)' }}
                      >
                        {isSubmitting ? (
                          <>
                            <IconLoader className="animate-spin" size={18} />
                            Iniciando proceso...
                          </>
                        ) : (
                          <>
                            <IconRocket size={20} />
                            Iniciar Proceso
                          </>
                        )}
                      </button>
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

          {status === 'processCreated' && createdUser && (
            <div className="mt-6 p-6 rounded-xl border-2" style={{ backgroundColor: 'var(--color-success)', borderColor: 'var(--color-success)' }}>
              <div className="flex items-start gap-3">
                <IconCheck className="text-white shrink-0" size={28} />
                <div>
                  <h3 className="text-white font-bold mb-2">¡Proceso iniciado exitosamente!</h3>
                  <p className="text-white/90 mb-4">
                    Tu proceso de prácticas ha sido registrado correctamente. Ya puedes iniciar sesión con tu correo institucional y tu documento de identidad.
                  </p>
                  <div className="space-y-3 text-white/90">
                    <p><strong className="text-white">Nombre:</strong> {createdUser.nombre}</p>
                    <p><strong className="text-white">Documento:</strong> {createdUser.documentoIdentidad}</p>
                    <p><strong className="text-white">Correo:</strong> {createdUser.correo}</p>
                    <p><strong className="text-white">Créditos aprobados:</strong> {createdUser.creditosAprobados}</p>
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
      </div>
    </section>
  );
}
