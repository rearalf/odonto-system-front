import { useState } from 'react';
import { Search, Bell, HelpCircle, Menu } from 'lucide-react';
import { useThemeStore } from '@/shared/stores/theme';

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

  // Conservamos la lógica del theme
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === 'dark';

  return (
    <header
      className={`fixed top-0 left-0 ${
        collapsed ? 'lg:left-16' : 'lg:left-64'
      } right-0 h-16 backdrop-blur-xl border-b z-40 flex items-center justify-between px-4 sm:px-6 transition-colors duration-200 ${
        isDark
          ? 'bg-bg-app/90 border-border-default text-white'
          : 'bg-white/95 border-border-default text-[#0b1c30]'
      }`}
    >
      {/* Vista Mobile: Logo / Título de la clínica */}
      <div className="flex lg:hidden items-center gap-2.5">
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
        <div className="flex flex-col">
          <span className="text-sm font-bold leading-tight text-text-primary">
            DentalCare
          </span>
          <span
            className={`text-[10px] leading-tight ${
              isDark ? 'text-slate-300' : 'text-[#718096]'
            }`}
          >
            Clínica Operativa (Sede Central)
          </span>
        </div>
      </div>

      {/* Vista Desktop: Colapsar menú + Barra de búsqueda */}
      <div className="hidden lg:flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
          aria-expanded={!collapsed}
          className={`p-1.5 rounded-lg transition-colors ${
            isDark
              ? 'text-slate-200 hover:bg-[#1c2e47]'
              : 'text-[#334155] hover:bg-slate-100'
          }`}
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
              className={`w-full pl-9 pr-4 py-1.5 rounded-lg text-xs focus:outline-none transition-colors placeholder:text-text-subtle ${
                isDark
                  ? 'bg-[#152438] text-white focus:bg-[#1c2e47] border border-border-subtle'
                  : 'bg-bg-app text-[#1e293b] border border-border-subtle focus:bg-white focus:border-primary'
              }`}
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
          className={`relative p-1.5 rounded-lg transition-colors ${
            isDark
              ? 'text-slate-300 hover:text-white hover:bg-[#1c2e47]'
              : 'text-text-muted hover:text-[#1e293b] hover:bg-slate-100'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Soporte y ayuda (Desktop) */}
        <button
          type="button"
          title="Soporte y ayuda"
          className={`hidden lg:flex p-1.5 rounded-lg transition-colors ${
            isDark
              ? 'text-slate-300 hover:text-white hover:bg-[#1c2e47]'
              : 'text-text-muted hover:text-[#1e293b] hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Perfil del usuario */}
        <div className="flex items-center gap-2 cursor-pointer select-none">
          <div className="relative">
            <img
              alt="Dra. Sarah Jensen"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-1 ring-slate-200"
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150"
            />
            {/* Punto verde de conexión */}
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#22c55e] rounded-full ring-2 ring-white" />
          </div>

          <span
            className={`text-xs font-medium hidden lg:inline transition-colors ${
              isDark ? 'text-slate-200' : 'text-[#334155]'
            }`}
          >
            Dra. Sarah Jensen
          </span>
        </div>

        {/* Menú hamburguesa (visible sólo en mobile) */}
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={sidebarOpen}
          className={`lg:hidden p-1.5 rounded-lg transition-colors ${
            isDark
              ? 'text-slate-200 hover:bg-[#1c2e47]'
              : 'text-[#334155] hover:bg-slate-100'
          }`}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
