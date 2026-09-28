import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '@/shared/components/ui';

export default function DoctorEditPage() {
  const { id } = useParams();

  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-headline-lg font-bold text-text-primary">
        Editar Doctor #{id}
      </h1>
      <div className="mt-6 p-6 bg-bg-surface rounded-xl border border-border-default">
        <p className="text-body-md text-text-muted">
          Formulario de edición (pendiente)
        </p>
      </div>
    </div>
  );
}
