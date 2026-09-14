import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import Breadcrumbs from '@/shared/components/ui/Breadcrumbs';

export default function PatientListPage() {
  return (
    <div>
      <Breadcrumbs />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-headline-lg font-bold text-text-primary">Pacientes</h1>
          <p className="mt-1 text-body-md text-text-muted">
            Gestión de pacientes registrados
          </p>
        </div>
        <Link
          to="/patients/new"
          className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 text-label-lg font-medium text-text-inverse bg-primary rounded-lg hover:bg-primary-hover sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Nuevo paciente
        </Link>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 w-full sm:w-72 max-w-full px-3 py-2 bg-bg-surface border border-border-default rounded-lg">
          <Search className="w-4 h-4 text-text-subtle" />
          <input
            type="text"
            placeholder="Buscar por nombre o documento..."
            className="w-full text-body-md bg-transparent outline-none placeholder:text-text-subtle text-text-primary"
          />
        </div>
      </div>

      <div className="mt-6 p-8 sm:p-12 bg-bg-surface rounded-xl border border-border-default shadow-sm text-center">
        <p className="text-body-md text-text-muted">
          No hay pacientes registrados aún.
        </p>
        <Link
          to="/patients/new"
          className="inline-block mt-4 text-label-lg font-medium text-primary hover:text-primary-hover"
        >
          Crear primer paciente →
        </Link>
      </div>
    </div>
  );
}
