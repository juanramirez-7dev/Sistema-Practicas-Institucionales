import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  IconMail,
  IconLock,
  IconLogin,
  IconAlertCircle,
  IconEye,
  IconEyeOff,
} from '@tabler/icons-react';
import { authenticateUser, CREDENTIALS_EXAMPLES } from '../../../lib/mockdata/users.ts';
import { useAuth } from '../../../hooks/useAuth.ts';

type LoginError = 'invalid-email' | 'invalid-credentials' | 'inactive-user' | null;

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<LoginError>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  const validateEmail = (email: string): boolean => {
    return email.toLowerCase().endsWith('@correo.itm.edu.co');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validar formato de email
    if (!validateEmail(email)) {
      setError('invalid-email');
      setIsLoading(false);
      return;
    }

    // Simular llamada al servidor
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Intentar autenticar
    const user = authenticateUser(email, password);

    if (!user) {
      setError('invalid-credentials');
      setIsLoading(false);
      return;
    }

    if (!user.activo) {
      setError('inactive-user');
      setIsLoading(false);
      return;
    }

    // Login exitoso - guardar usuario y redirigir al dashboard
    login(user);
    navigate('/dashboard');
    setIsLoading(false);
  };

  const getErrorMessage = (error: LoginError): string => {
    switch (error) {
      case 'invalid-email':
        return 'El correo debe ser institucional (@correo.itm.edu.co)';
      case 'invalid-credentials':
        return 'Correo o contraseña incorrectos';
      case 'inactive-user':
        return 'Tu cuenta está inactiva. Contacta a la oficina de prácticas';
      default:
        return '';
    }
  };

  const fillCredentials = (role: keyof typeof CREDENTIALS_EXAMPLES) => {
    const creds = CREDENTIALS_EXAMPLES[role];
    setEmail(creds.email);
    setPassword(creds.password);
    setError(null);
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
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  placeholder="tucorreo@correo.itm.edu.co"
                  className="w-full px-4 py-3 pl-12 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{
                    backgroundColor: 'var(--color-gray-light)',
                    borderColor: error ? 'var(--color-error)' : 'var(--color-border)',
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
                    setError(null);
                  }}
                  placeholder="Ingresa tu documento"
                  className="w-full px-4 py-3 pl-12 pr-12 rounded-xl border-2 focus:outline-none focus:border-opacity-100 transition-colors"
                  style={{
                    backgroundColor: 'var(--color-gray-light)',
                    borderColor: error ? 'var(--color-error)' : 'var(--color-border)',
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
            {error && (
              <div
                className="p-4 rounded-xl flex items-start gap-3"
                style={{ backgroundColor: 'var(--color-error)', color: 'white' }}
              >
                <IconAlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <p className="text-sm">{getErrorMessage(error)}</p>
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

          {/* Credenciales de prueba */}
          <div className="mt-6">
            <button
              onClick={() => setShowCredentials(!showCredentials)}
              className="w-full text-sm text-center"
              style={{ color: 'var(--color-gray-medium)' }}
            >
              {showCredentials ? '▼' : '►'} Ver credenciales de prueba
            </button>

            {showCredentials && (
              <div
                className="mt-4 p-4 rounded-xl space-y-3"
                style={{ backgroundColor: 'var(--color-gray-light)' }}
              >
                <p
                  className="text-sm font-bold mb-3"
                  style={{ color: 'var(--color-text)' }}
                >
                  Haz clic para usar estas credenciales:
                </p>
                {Object.entries(CREDENTIALS_EXAMPLES).map(([role, creds]) => (
                  <button
                    key={role}
                    onClick={() => fillCredentials(role as keyof typeof CREDENTIALS_EXAMPLES)}
                    className="w-full p-3 rounded-lg text-left transition-all hover:scale-[1.02]"
                    style={{ backgroundColor: 'var(--color-white)' }}
                  >
                    <p
                      className="font-bold text-sm capitalize mb-1"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {role}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: 'var(--color-gray-medium)' }}
                    >
                      {creds.email}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
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
