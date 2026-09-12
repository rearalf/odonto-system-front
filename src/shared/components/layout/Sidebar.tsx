import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  Sun,
  Moon,
  FlaskConical,
  Receipt,
  ChevronDown,
} from 'lucide-react';
import { clsx } from 'clsx';
import { useThemeStore } from '@/shared/stores/theme';

// Icono personalizado de diente idéntico al logo y al ítem de Odontograma
const ToothIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.66 4.34C17.5 3.18 15.86 2.5 14.1 2.5c-1.28 0-2.12.35-2.1.35-.02 0-.82-.35-2.1-.35-1.76 0-3.4.68-4.56 1.84C3.82 5.86 3.5 8.1 3.5 10.5c0 3.3 1.25 6.35 2.12 8.52.56 1.4 1.2 2.48 2.08 2.48.97 0 1.55-1.12 2.3-2.58.48-.94.98-1.92 2-1.92s1.52.98 2 1.92c.75 1.46 1.33 2.58 2.3 2.58.88 0 1.52-1.08 2.08-2.48.87-2.17 2.12-5.22 2.12-8.52 0-2.4-.32-4.64-1.84-6.16z" />
  </svg>
);

const links = [
  { to: '/', label: 'Dashboard / Panel', icon: LayoutDashboard },
  { to: '/patients', label: 'Pacientes', icon: Users },
  { to: '/appointments', label: 'Agenda de Citas', icon: Calendar },
  { to: '/odontogram', label: 'Odontograma', icon: ToothIcon },
  { to: '/treatments', label: 'Tratamientos', icon: FlaskConical },
  { to: '/billing', label: 'Facturación', icon: Receipt },
  { to: '/settings', label: 'Configuración', icon: Settings },
];

export function Sidebar({
  open = false,
  onClose,
  collapsed = false,
}: {
  open?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
}) {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const isDark = theme === 'dark';

  // Cerrar con tecla Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <>
      {/* Overlay solo en mobile cuando abre el drawer */}
      {open && (
        <div
          aria-hidden="true"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}
      {/* ponytail: enlaces del sidebar traducido siguen enfocables con Tab en mobile cerrado; focus trap si se vuelve necesario */}
      <aside
        className={clsx(
          'fixed left-0 top-0 h-screen border-r z-50 flex flex-col justify-between select-none transition duration-200 lg:translate-x-0',
          collapsed ? 'w-16' : 'w-64',
          open ? 'translate-x-0' : '-translate-x-full',
          'bg-bg-surface border-border-sidebar text-text-secondary',
        )}
      >
        {/* Sección Superior: Marca, Sede y Menú */}
        <div className="flex flex-col">
          {/* Encabezado con Logo DentalCare */}
          <div
            className={clsx(
              'h-16 flex items-center gap-3',
              collapsed ? 'justify-center px-0' : 'px-5',
            )}
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-sm shadow-sky-500/20">
              <ToothIcon className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight text-text-primary">
                  DentalCare
                </span>
                <span className="text-[10px] text-text-subtle leading-tight">
                  Gestión Odontológica
                </span>
              </div>
            )}
          </div>

          {/* Badge Clínica Operativa (Sede Central) */}
          {!collapsed && (
            <div className="px-4 pb-3">
              <div
                className={clsx(
                  'flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors cursor-pointer border border-border-subtle text-text-secondary',
                  isDark ? 'bg-[#152438]' : 'bg-[#f4f7fb]',
                )}
              >
                <span className="text-xs text-primary font-bold leading-none">
                  +
                </span>
                <span className="truncate">
                  Clínica Operativa (Sede Central)
                </span>
              </div>
            </div>
          )}

          {/* Navegación */}
          <nav className="flex flex-col gap-0.5 px-3">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={onClose}
                title={collapsed ? label : undefined}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all duration-150 group relative',
                    collapsed ? 'justify-center' : 'justify-start',
                    isActive
                      ? 'bg-primary text-white font-medium shadow-sm'
                      : isDark
                        ? 'text-slate-300 hover:bg-[#152438] hover:text-white'
                        : 'text-text-muted hover:bg-[#edf3fa] hover:text-[#1e293b]',
                  )
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className={collapsed ? 'sr-only' : undefined}>
                  {label}
                </span>
                {collapsed && (
                  <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-[#0b1c30] text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50">
                    {label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sección Inferior: Tema visual y Perfil */}
        <div className="p-3 flex flex-col gap-2">
          {/* Toggle de tema (Tema visual) */}
          {collapsed ? (
            <button
              type="button"
              onClick={toggleTheme}
              title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className={clsx(
                'mx-auto p-2 rounded-xl transition-colors bg-bg-surface-elevated',
                isDark
                  ? 'text-amber-400 hover:bg-[#1f334f]'
                  : 'text-text-muted hover:text-[#0b1c30]',
              )}
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          ) : (
            <div
              className={clsx(
                'flex items-center justify-between px-3 py-2 rounded-xl transition-colors bg-bg-surface-elevated',
              )}
            >
              <span
                className={clsx(
                  'text-[11px] font-medium',
                  isDark ? 'text-slate-300' : 'text-text-muted',
                )}
              >
                Tema visual
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                title={
                  isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
                }
                className={clsx(
                  'p-1 rounded-md transition-colors',
                  isDark
                    ? 'text-amber-400 hover:bg-[#1f334f]'
                    : 'text-text-muted hover:text-[#0b1c30]',
                )}
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            </div>
          )}

          {/* Tarjeta de Perfil / Administradora */}
          <div
            className={clsx(
              'flex items-center justify-between rounded-xl transition-colors cursor-pointer',
              collapsed ? 'justify-center p-2' : 'justify-between p-2',
              isDark ? 'hover:bg-[#152438]' : 'hover:bg-bg-surface-subtle',
            )}
          >
            <div
              className={clsx(
                'flex items-center gap-2.5 min-w-0',
                collapsed && 'mx-auto',
              )}
            >
              <img
                alt="Dra. Sarah Jensen"
                className="w-8 h-8 rounded-full object-cover shrink-0"
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150"
              />
              {!collapsed && (
                <div className="flex flex-col min-w-0">
                  <span
                    className={clsx(
                      'text-xs font-semibold truncate leading-tight',
                      isDark ? 'text-white' : 'text-[#1e293b]',
                    )}
                  >
                    Dra. Sarah Jensen
                  </span>
                  <span className="text-[10px] text-text-subtle truncate leading-tight">
                    Administradora Clínica
                  </span>
                </div>
              )}
            </div>
            {!collapsed && (
              <ChevronDown className="w-4 h-4 text-text-subtle shrink-0" />
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
