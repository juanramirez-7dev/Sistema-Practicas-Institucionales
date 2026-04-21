import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconWorld,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconClock,
} from '@tabler/icons-react';

const CONTACTO_INFO = [
  {
    icon: IconMail,
    titulo: 'Correo Electrónico',
    valor: 'practicas@itm.edu.co',
    link: 'mailto:practicas@itm.edu.co',
  },
  {
    icon: IconPhone,
    titulo: 'Teléfono',
    valor: '+57 (4) 440 5100 Ext. 5555',
    link: 'tel:+573004405100',
  },
  {
    icon: IconMapPin,
    titulo: 'Dirección',
    valor: 'Calle 73 #76A-354, Medellín, Colombia',
    link: 'https://maps.google.com/?q=Calle+73+76A-354+Medellin',
  },
  {
    icon: IconWorld,
    titulo: 'Sitio Web',
    valor: 'www.itm.edu.co',
    link: 'https://www.itm.edu.co',
  },
];

const HORARIOS = [
  { dia: 'Lunes - Viernes', horario: '8:00 AM - 12:00 PM / 2:00 PM - 6:00 PM' },
  { dia: 'Sábados', horario: '8:00 AM - 12:00 PM' },
  { dia: 'Domingos y Festivos', horario: 'Cerrado' },
];

export function ContactoSection() {
  return (
    <section
      id="contacto"
      className="min-h-screen py-16 px-6"
      style={{ backgroundColor: 'var(--color-gray-light)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="mb-4"
            style={{ color: 'var(--color-primary)' }}
          >
            Información de Contacto
          </h2>
          <p
            className="text-lg max-w-3xl mx-auto"
            style={{ color: 'var(--color-gray-medium)' }}
          >
            Estamos aquí para ayudarte. Ponte en contacto con la Oficina de
            Prácticas Profesionales del ITM.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Información de contacto */}
          <div>
            <h3
              className="mb-6"
              style={{ color: 'var(--color-text)' }}
            >
              Canales de Comunicación
            </h3>
            <div className="space-y-4">
              {CONTACTO_INFO.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-6 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg"
                    style={{ backgroundColor: 'var(--color-white)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--color-secondary)' }}
                    >
                      <Icon className="text-white" size={24} />
                    </div>
                    <div>
                      <p
                        className="font-bold mb-1"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {item.titulo}
                      </p>
                      <p style={{ color: 'var(--color-gray-medium)' }}>
                        {item.valor}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Horarios de atención */}
          <div>
            <h3
              className="mb-6"
              style={{ color: 'var(--color-text)' }}
            >
              Horarios de Atención
            </h3>
            <div
              className="p-6 rounded-xl"
              style={{ backgroundColor: 'var(--color-white)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <IconClock className="text-white" size={24} />
                </div>
                <h4
                  className="font-bold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Oficina de Prácticas
                </h4>
              </div>

              <div className="space-y-4">
                {HORARIOS.map((horario, index) => (
                  <div
                    key={index}
                    className="pb-4 border-b last:border-b-0"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <p
                      className="font-bold mb-1"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {horario.dia}
                    </p>
                    <p style={{ color: 'var(--color-gray-medium)' }}>
                      {horario.horario}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Redes sociales */}
            <div
              className="mt-6 p-6 rounded-xl"
              style={{ backgroundColor: 'var(--color-white)' }}
            >
              <h4
                className="font-bold mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                Síguenos en Redes Sociales
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com/itmmedellin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <IconBrandFacebook className="text-white" size={24} />
                </a>
                <a
                  href="https://instagram.com/itmmedellin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <IconBrandInstagram className="text-white" size={24} />
                </a>
                <a
                  href="https://linkedin.com/school/itm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <IconBrandLinkedin className="text-white" size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mapa o CTA adicional */}
        <div
          className="p-8 rounded-2xl text-center"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <h3 className="text-white font-bold mb-3">
            ¿Tienes alguna pregunta?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Nuestro equipo está disponible para resolver todas tus dudas sobre
            el proceso de prácticas profesionales. No dudes en contactarnos por
            cualquiera de nuestros canales.
          </p>
          <button
            className="px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-white)',
            }}
          >
            Enviar Mensaje
          </button>
        </div>
      </div>
    </section>
  );
}
