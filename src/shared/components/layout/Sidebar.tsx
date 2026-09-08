import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Stethoscope, Settings } from 'lucide-react';
import { clsx } from 'clsx';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/patients', label: 'Pacientes', icon: Users },
  { to: '/appointments', label: 'Citas', icon: Calendar },
  { to: '/doctors', label: 'Doctores', icon: Stethoscope },
  { to: '/settings', label: 'Configuración', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="flex flex-col w-64 h-screen bg-gray-900 text-white">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-700">
        <Stethoscope className="w-6 h-6 text-emerald-400" />
        <span className="text-lg font-semibold">Odonto System</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white',
              )
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>

        ))}
      </nav>

      <div className="px-6 py-4 border-t border-gray-700 text-xs text-gray-500">
        v0.1.0
      </div>
    </aside>
  );
}
