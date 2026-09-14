import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PatientEditPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <Link to={`/patients/${id}`} className="inline-flex items-center gap-1 text-body-md text-text-muted hover:text-text-primary">
        <ArrowLeft className="w-4 h-4" />
        Volver al detalle
      </Link>

      <h1 className="mt-4 text-headline-lg font-bold text-text-primary">Editar paciente</h1>
      <p className="mt-1 text-body-md text-text-muted">ID: {id}</p>

      <div className="mt-6 p-8 bg-bg-surface rounded-xl border border-border-default shadow-sm text-center">
        <p className="text-body-md text-text-muted">Formulario de edición — pendiente de implementación</p>
      </div>
    </div>
  );
}
