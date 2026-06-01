import { Link } from 'react-router';
import {
  IconBuildingSkyscraper,
  IconCalendar,
  IconUsers,
  IconFilter,
  IconFileText,
  IconRocket,
  IconLogin,
} from '@tabler/icons-react';

const BENEFICIOS = [
  {
    icon: IconUsers,
    text: 'Acceder a perfiles de estudiantes calificados',
  },
  {
    icon: IconFilter,
    text: 'Filtrar por área de conocimiento o tecnología',
  },
  {
    icon: IconFileText,
    text: 'Gestionar procesos de vinculación digitalmente',
  },
  {
    icon: IconRocket,
    text: 'Acompañamiento del departamento de prácticas',
  },
];

const PROCESO_VINCULACION = [
  {
    numero: 1,
    titulo: 'Agendar cita',
    descripcion: 'Programa una reunión con el departamento de prácticas',
  },
  {
    numero: 2,
    titulo: 'Presentar empresa',
    descripcion: 'Comparte información sobre tu organización y necesidades',
  },
  {
    numero: 3,
    titulo: 'Firmar convenio',
    descripcion: 'Formaliza el acuerdo de cooperación con el ITM',
  },
  {
    numero: 4,
    titulo: 'Acceder a plataforma',
    descripcion: 'Recibe tus credenciales para ingresar al sistema',
  },
  {
    numero: 5,
    titulo: 'Gestionar',
    descripcion: 'Comienza a buscar y seleccionar estudiantes',
  },
];

export function EmpresasSection() {
  return (
    <section
      id="empresas"
      className="min-h-screen py-16 px-6"
      style={{ backgroundColor: 'var(--color-white)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <IconBuildingSkyscraper className="text-white" size={32} />
            </div>
          </div>
          <h2
            className="mb-4"
            style={{ color: 'var(--color-primary)' }}
          >
            ¿Eres una empresa?
          </h2>
          <p
            className="text-lg max-w-3xl mx-auto"
            style={{ color: 'var(--color-gray-medium)' }}
          >
            Únete a nuestra red de empresas aliadas y encuentra el talento que
            tu organización necesita. Conecta con estudiantes altamente
            capacitados del ITM.
          </p>
        </div>

        {/* Beneficios */}
        <div className="mb-12">
          <h3
            className="text-center mb-8"
            style={{ color: 'var(--color-text)' }}
          >
            ¿Qué puedes hacer como empresa aliada?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {BENEFICIOS.map((beneficio, index) => {
              const Icon = beneficio.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-xl transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: 'var(--color-gray-light)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <p
                      className="font-bold"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {beneficio.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Proceso de vinculación */}
        <div className="mb-12">
          <h3
            className="text-center mb-8"
            style={{ color: 'var(--color-text)' }}
          >
            Proceso de Vinculación
          </h3>
          <div
            className="p-8 rounded-2xl"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <div className="grid md:grid-cols-5 gap-6">
              {PROCESO_VINCULACION.map((paso, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-3 font-bold text-xl"
                      style={{
                        backgroundColor: 'var(--color-accent)',
                        color: 'var(--color-white)',
                      }}
                    >
                      {paso.numero}
                    </div>
                    <h4 className="text-white font-bold mb-2">{paso.titulo}</h4>
                    <p className="text-white/80 text-sm">{paso.descripcion}</p>
                  </div>
                  {index < PROCESO_VINCULACION.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-full w-full h-0.5 bg-white/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Agendar cita */}
          <div
            className="p-8 rounded-2xl border-2"
            style={{
              backgroundColor: 'var(--color-gray-light)',
              borderColor: 'var(--color-secondary)',
            }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                <IconCalendar className="text-white" size={24} />
              </div>
              <div>
                <h3
                  className="font-bold mb-2"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Nueva Empresa
                </h3>
                <p style={{ color: 'var(--color-gray-medium)' }}>
                  ¿Primera vez vinculándote con el ITM? Agenda una cita con
                  nuestro departamento de prácticas para iniciar el proceso.
                </p>
              </div>
            </div>
            <button
              className="w-full px-6 py-3 rounded-xl text-white font-bold transition-all hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              <IconCalendar size={20} />
              Agendar Cita
            </button>
          </div>

          {/* Ya tengo cuenta */}
          <div
            className="p-8 rounded-2xl border-2"
            style={{
              backgroundColor: 'var(--color-gray-light)',
              borderColor: 'var(--color-primary)',
            }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <IconLogin className="text-white" size={24} />
              </div>
              <div>
                <h3
                  className="font-bold mb-2"
                  style={{ color: 'var(--color-primary)' }}
                >
                  ¿Ya tienes cuenta?
                </h3>
                <p style={{ color: 'var(--color-gray-medium)' }}>
                  Si ya completaste el proceso de vinculación y tienes tus
                  credenciales, ingresa directamente al sistema.
                </p>
              </div>
            </div>
            <Link
              to="/login"
              className="w-full px-6 py-3 rounded-xl font-bold transition-all hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-white)',
              }}
            >
              <IconLogin size={20} />
              Iniciar Sesión
            </Link>
          </div>
        </div>

        {/* Información adicional */}
        <div
          className="mt-8 p-6 rounded-xl text-center"
          style={{ backgroundColor: 'var(--color-gray-light)' }}
        >
          <p style={{ color: 'var(--color-gray-medium)' }}>
            <strong style={{ color: 'var(--color-text)' }}>Nota:</strong> El
            proceso de vinculación toma aproximadamente 2-3 semanas desde la
            primera reunión hasta el acceso completo a la plataforma.
          </p>
        </div>
      </div>
    </section>
  );
}
