import { useState } from 'react';
import { Link } from 'react-router';
import {
  IconMail,
  IconLock,
  IconLogin,
  IconAlertCircle,
  IconEye,
  IconEyeOff,
} from '@tabler/icons-react';
import { useAuth } from '../hooks/useAuth.ts';

export function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);


    try {
      await login({ login: email, password });
    } catch (error) {
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('No se pudo iniciar sesion. Intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{ backgroundColor: 'var(--color-gray-light)' }}
    >
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <span
              className="font-bold text-3xl"
              style={{ color: 'var(--color-white)' }}
            >
              ITM
            </span>
          </div>
          <h1 style={{ color: 'var(--color-primary)' }}>Iniciar Sesión</h1>
          <p style={{ color: 'var(--color-gray-medium)' }} className="mt-2">
            Sistema de Gestión de Prácticas Profesionales
          </p>
        </div>

        {/* Formulario de login */}
        <div
          className="rounded-2xl p-8 shadow-lg"
          style={{ backgroundColor: 'var(--color-white)' }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                Correo Institucional
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="tucorreo@correo.itm.edu.co"
                  className="w-full px-4 py-3 pl-12 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{
                    backgroundColor: 'var(--color-gray-light)',
                    borderColor: errorMessage ? 'var(--color-error)' : 'var(--color-border)',
                  }}
                  required
                  autoComplete="email"
                />
                <IconMail
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  size={20}
                  style={{ color: 'var(--color-gray-medium)' }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                Contraseña (Documento de Identidad)
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="Ingresa tu documento"
                  className="w-full px-4 py-3 pl-12 pr-12 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{
                    backgroundColor: 'var(--color-gray-light)',
                    borderColor: errorMessage ? 'var(--color-error)' : 'var(--color-border)',
                  }}
                  required
                  autoComplete="current-password"
                />
                <IconLock
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  size={20}
                  style={{ color: 'var(--color-gray-medium)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--color-gray-medium)' }}
                >
                  {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div
                className="p-4 rounded-xl flex items-start gap-3"
                style={{ backgroundColor: 'var(--color-error)', color: 'white' }}
              >
                <IconAlertCircle size={20} className="shrink-0 mt-0.5" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 rounded-xl text-white font-bold transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Validando...</span>
                </>
              ) : (
                <>
                  <IconLogin size={20} />
                  <span>Iniciar Sesión</span>
                </>
              )}
            </button>
          </form>

        </div>

        {/* Link de regreso */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 transition-colors hover:underline"
            style={{ color: 'var(--color-gray-medium)' }}
          >
            ← Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}
