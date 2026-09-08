import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';

export default function PatientListPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
          <p className="mt-1 text-sm text-gray-500">Gestión de pacientes registrados</p>
        </div>
        <Link
          to="/patients/new"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
        >
          <Plus className="w-4 h-4" />
          Nuevo paciente
        </Link>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 w-72 px-3 py-2 bg-white border border-gray-200 rounded-lg">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o documento..."
            className="w-full text-sm bg-transparent outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="mt-6 p-12 bg-white rounded-xl border border-gray-200 shadow-sm text-center">
        <p className="text-sm text-gray-500">No hay pacientes registrados aún.</p>
        <Link
          to="/patients/new"
          className="inline-block mt-4 text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          Crear primer paciente →
        </Link>
      </div>
    </div>
  );
}
