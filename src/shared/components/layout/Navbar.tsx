import { useState } from 'react';
import { Search, Bell, HelpCircle, Menu } from 'lucide-react';
import { clsx } from 'clsx';

export const Navbar = ({
  sidebarOpen,
  onToggleSidebar,
  collapsed,
  onToggleCollapse,
}: {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 h-16 backdrop-blur-xl border-b z-40 flex items-center justify-between px-4 sm:px-6 transition-colors duration-200 bg-bg-chrome/90 border-border-default text-text-primary',
        collapsed ? 'md:left-18' : 'md:left-64',
      )}
    >
      {/* Vista Mobile: Logo / Título de la clínica */}
      <div className="flex md:hidden items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-sm shadow-sky-500/20">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M12 2C8.5 2 6 4.5 6 8c0 3 1.5 5 2 7.5.5 2.5 1 4.5 2 4.5s1.5-2 2-4.5c.5-2.5 2-4.5 2-7.5 0-3.5-2.5-6-6-6z" />
          </svg>
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="text-title-md font-bold leading-tight text-text-primary truncate">
            DentalCare
          </span>
          <span className="text-label-sm leading-tight text-text-subtle truncate">
            Clínica Operativa (Sede Central)
          </span>
        </div>
      </div>

      {/* Vista Desktop: Colapsar menú + Barra de búsqueda */}
      <div className="hidden md:flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
          aria-expanded={!collapsed}
          className="p-2 rounded-lg transition-colors text-text-secondary hover:bg-bg-surface-elevated hover:text-text-primary"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="w-72 lg:w-96">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle pointer-events-none" />
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Buscar paciente por RUT, nombre o ficha..."
              className="w-full pl-9 pr-4 py-1.5 rounded-lg text-body-sm focus:outline-none transition-colors placeholder:text-text-subtle bg-bg-surface-subtle focus:bg-bg-surface border border-border-subtle text-text-primary focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Acciones del usuario (Notificaciones, Soporte, Perfil, Menú) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notificaciones con indicador rojo */}
        <button
          type="button"
          title="Notificaciones"
          className="relative p-2 rounded-lg transition-colors text-text-muted hover:text-text-primary hover:bg-bg-surface-elevated"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Soporte y ayuda (Desktop) */}
        <button
          type="button"
          title="Soporte y ayuda"
          className="hidden lg:flex p-2 rounded-lg transition-colors text-text-muted hover:text-text-primary hover:bg-bg-surface-elevated"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Perfil del usuario */}
        <div className="flex items-center gap-2 cursor-pointer select-none">
          <div className="relative">
            <img
              alt="Dra. Sarah Jensen"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-1 ring-border-subtle"
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150"
            />
            {/* Punto verde de conexión */}
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#22c55e] rounded-full ring-2 ring-white" />
          </div>

          <span className="text-label-md font-medium hidden lg:inline transition-colors text-text-secondary">
            Dra. Sarah Jensen
          </span>
        </div>

        {/* Menú hamburguesa (visible sólo en mobile) */}
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={sidebarOpen}
          className="md:hidden p-2 rounded-lg transition-colors text-text-secondary hover:text-text-primary hover:bg-bg-surface-elevated"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
