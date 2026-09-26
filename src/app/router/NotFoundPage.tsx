import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Cross, LayoutDashboard } from 'lucide-react';
import { Badge, Button } from '@/shared/components/ui';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-bg-app">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-90 w-180 -translate-x-1/2 rounded-full bg-linear-to-b from-primary-light via-bg-app to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-primary/30 blur-2xl" />

      <section className="relative flex w-full flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 md:py-16">
        <div className="flex w-full max-w-5xl flex-col items-center text-center">
          <Badge
            variant="default"
            size="sm"
            dot
            className="mb-6 shadow-sm [&>span]:animate-pulse"
          >
            <Cross className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            Código Clínico 404 • Recurso Inaccesible
          </Badge>

          <div className="relative my-2 flex select-none items-center justify-center">
            <div className="absolute inset-0 scale-75 rounded-full bg-primary/5 blur-xl" />
            <div className="flex items-center justify-center gap-2 text-center sm:gap-4">
              <span className="font-display text-[96px] font-bold leading-none tracking-tighter text-primary/20 sm:text-[140px] md:text-[168px]">
                4
              </span>
              <div className="flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36 md:h-44 md:w-44">
                <svg
                  className="h-full w-full drop-shadow-md"
                  fill="none"
                  viewBox="0 0 160 160"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      id="dentalGrad"
                      x1="20"
                      x2="140"
                      y1="20"
                      y2="140"
                    >
                      <stop
                        offset="0"
                        style={{
                          stopColor:
                            'color-mix(in srgb, var(--color-primary) 50%, var(--color-text-inverse))',
                        }}
                      />
                      <stop
                        offset="0.6"
                        style={{ stopColor: 'var(--color-primary)' }}
                      />
                      <stop
                        offset="1"
                        style={{
                          stopColor: 'var(--color-primary-active)',
                        }}
                      />
                    </linearGradient>
                    <filter
                      height="120%"
                      id="softGlow"
                      width="120%"
                      x="-10%"
                      y="-10%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="4"
                        floodOpacity="0.15"
                        stdDeviation="6"
                        style={{
                          floodColor: 'var(--color-primary)',
                        }}
                      />
                    </filter>
                  </defs>
                  <path
                    d="M48 40 C34 40, 24 55, 26 78 C28 98, 38 126, 52 136 C60 142, 68 132, 74 114 C77 104, 83 104, 86 114 C92 132, 100 142, 108 136 C122 126, 132 98, 134 78 C136 55, 126 40, 112 40 C98 40, 92 48, 80 48 C68 48, 62 40, 48 40 Z"
                    fill="url(#dentalGrad)"
                    filter="url(#softGlow)"
                  />
                  <rect className="fill-text-inverse" height="32" rx="3" width="12" x="74" y="62" />
                  <rect className="fill-text-inverse" height="12" rx="3" width="32" x="64" y="72" />
                  <circle
                    className="fill-bg-surface-elevated stroke-primary"
                    cx="116"
                    cy="46"
                    r="16"
                    strokeWidth="4"
                  />
                  <path
                    className="stroke-primary"
                    d="M128 58 L146 76"
                    strokeLinecap="round"
                    strokeWidth="5"
                  />
                  <circle className="fill-primary" cx="116" cy="46" opacity="0.45" r="11" />
                  <path
                    className="stroke-text-inverse"
                    d="M112 40 A 8 8 0 0 1 122 44"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
              <span className="font-display text-[96px] font-bold leading-none tracking-tighter text-primary/20 sm:text-[140px] md:text-[168px]">
                4
              </span>
            </div>
          </div>

          <div className="mt-4 max-w-2xl">
            <h1 className="mb-1 font-display text-headline-lg font-bold tracking-tight text-text-primary md:text-display">
              Expediente o página no encontrada
            </h1>
            <p className="text-body-lg leading-relaxed text-text-secondary">
              El recurso clínico, ficha odontológica del paciente o ruta de
              navegación que buscas no existe, ha sido trasladado o tu sesión
              no cuenta con los permisos sanitarios necesarios en esta sede
              operativa.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              icon={<ArrowLeft className="h-4 w-4" />}
              onClick={() => navigate(-1)}
            >
              Volver a la página anterior
            </Button>
            <Link
              to="/"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-secondary-border bg-secondary px-5 text-label-lg font-medium text-secondary-text transition-colors hover:bg-secondary-hover sm:w-auto"
            >
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              Ir al panel principal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
