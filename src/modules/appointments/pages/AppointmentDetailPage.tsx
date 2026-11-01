import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Stethoscope, AlertCircle } from 'lucide-react';

import {
  Badge,
  Button,
} from '@/shared/components/ui';
import { Breadcrumbs } from '@/shared/components/ui';

export default function AppointmentDetailPage() {
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
              Detalle de cita
            </h1>
            <p className="mt-1 text-body-md text-text-muted">
              Información completa de la cita
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/appointments">
            <Button variant="ghost">Volver</Button>
          </Link>
        </div>
      </section>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Calendar className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-headline-sm font-semibold text-text-primary">Fecha y hora</h3>
          </div>
          <dl className="space-y-3 text-text-secondary">
            <div>
              <dt className="text-label-sm text-text-muted">Inicio</dt>
              <dd className="font-mono text-body-md">—</dd>
            </div>
            <div>
              <dt className="text-label-sm text-text-muted">Fin</dt>
              <dd className="font-mono text-body-md">—</dd>
            </div>
            <div>
              <dt className="text-label-sm text-text-muted">Duración</dt>
              <dd className="flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span>— min</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <User className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-headline-sm font-semibold text-text-primary">Paciente</h3>
          </div>
          <dl className="space-y-3 text-text-secondary">
            <div>
              <dt className="text-label-sm text-text-muted">Nombre</dt>
              <dd className="font-medium text-text-primary">—</dd>
            </div>
            <div>
              <dt className="text-label-sm text-text-muted">Teléfono</dt>
              <dd>—</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Stethoscope className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-headline-sm font-semibold text-text-primary">Doctor</h3>
          </div>
          <dl className="space-y-3 text-text-secondary">
            <div>
              <dt className="text-label-sm text-text-muted">Nombre</dt>
              <dd className="font-medium text-text-primary">—</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm sm:col-span-2 lg:col-span-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <AlertCircle className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-headline-sm font-semibold text-text-primary">Detalles</h3>
          </div>
          <dl className="space-y-4">
            <div>
              <dt className="text-label-sm text-text-muted">Estado</dt>
              <dd>
                <Badge variant="default">—</Badge>
              </dd>
            </div>
            <div>
              <dt className="text-label-sm text-text-muted">Motivo</dt>
              <dd className="text-text-primary">—</dd>
            </div>
            <div>
              <dt className="text-label-sm text-text-muted">Notas</dt>
              <dd className="text-text-secondary">—</dd>
            </div>
            <div>
              <dt className="text-label-sm text-text-muted">Sin cita previa</dt>
              <dd>
                <Badge variant="default">No</Badge>
              </dd>
            </div>
            <div>
              <dt className="text-label-sm text-text-muted">Reagendada</dt>
              <dd>
                <Badge variant="default">No</Badge>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <p className="mt-8 text-center text-body-md text-text-muted">
        Esta página está en desarrollo. Los datos se cargarán cuando se implemente el hook de detalle.
      </p>
    </>
  );
}