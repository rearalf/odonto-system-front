import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <Link to="/patients" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary">
        <ArrowLeft className="w-4 h-4" />
        Volver a la lista
      </Link>

      <div className="flex items-center justify-between mt-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Detalle del paciente</h1>
          <p className="mt-1 text-sm text-text-muted">ID: {id}</p>
        </div>
        <Link
          to={`/patients/${id}/edit`}
          className="px-4 py-2 text-sm font-medium text-text-inverse bg-primary rounded-lg hover:bg-primary-hover"
        >
          Editar
        </Link>
      </div>

      <div className="mt-6 p-8 bg-bg-surface rounded-xl border border-border-default shadow-sm text-center">
        <p className="text-sm text-text-muted">Expediente del paciente — pendiente de implementación</p>
      </div>
    </div>
  );
}
