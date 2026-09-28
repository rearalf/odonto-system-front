import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Breadcrumbs } from '@/shared/components/ui';

export default function DoctorListPage() {
  return (
    <div>
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h1 className="text-headline-lg font-bold text-text-primary">Doctores</h1>
        <Link
          to="/doctors/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-label-md font-medium text-white"
        >
          <Plus className="h-4 w-4" />
          Nuevo Doctor
        </Link>
      </div>

      <div className="mt-6 p-6 bg-bg-surface rounded-xl border border-border-default">
        <p className="text-body-md text-text-muted">
          Listado de doctores (pendiente)
        </p>
      </div>
    </div>
  );
}
