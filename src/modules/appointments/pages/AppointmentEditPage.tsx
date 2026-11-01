import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { Breadcrumbs, Button } from '@/shared/components/ui';

export default function AppointmentEditPage() {
  return (
    <>
      <Breadcrumbs />

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link to="/appointments" aria-label="Volver a citas">
            <Button variant="ghost" size="sm" aria-label="Volver">
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
          </Link>
          <div>
            <h1 className="mt-4 text-headline-lg font-bold text-text-primary">
              Editar cita
            </h1>
            <p className="mt-1 text-body-md text-text-muted">
              Modificar información de la cita
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/appointments">
            <Button variant="ghost">Volver</Button>
          </Link>
        </div>
      </section>

      <div className="mt-6 rounded-xl border border-border-default bg-bg-surface p-8 shadow-sm text-center">
        <p className="text-body-md text-text-muted">
          Esta página está en desarrollo.
        </p>
        <p className="mt-2 text-body-sm text-text-secondary">
          El formulario de edición se implementará próximamente.
        </p>
      </div>
    </>
  );
}