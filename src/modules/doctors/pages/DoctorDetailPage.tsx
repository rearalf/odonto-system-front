import { Link, useParams } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { Breadcrumbs } from '@/shared/components/ui';

export default function DoctorDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <Breadcrumbs />
      <div className="flex items-center justify-between">
        <h1 className="text-headline-lg font-bold text-text-primary">
          Ficha del Doctor #{id}
        </h1>
        <Link
          to={`/doctors/${id}/edit`}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-label-md font-medium text-white"
        >
          <Pencil className="h-4 w-4" />
          Editar
        </Link>
      </div>
      <div className="mt-6 p-6 bg-bg-surface rounded-xl border border-border-default">
        <p className="text-body-md text-text-muted">
          Detalle del doctor (pendiente)
        </p>
      </div>
    </div>
  );
}
