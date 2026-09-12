import { Users, Calendar, Activity } from 'lucide-react';
import Breadcrumbs from '@/shared/components/ui/Breadcrumbs';

const stats = [
  { label: 'Pacientes', value: '0', icon: Users, color: 'bg-emerald-500' },
  { label: 'Citas hoy', value: '0', icon: Calendar, color: 'bg-blue-500' },
  { label: 'Tratamientos', value: '0', icon: Activity, color: 'bg-purple-500' },
];

export default function DashboardPage() {
  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">
        Resumen del sistema odontológico
      </p>

      <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Bienvenido</h2>
        <p className="mt-2 text-sm text-gray-500">
          Sistema en fase de desarrollo. Próximamente se habilitarán los módulos
          de gestión de pacientes, citas y odontograma.
        </p>
      </div>
    </div>
  );
}
