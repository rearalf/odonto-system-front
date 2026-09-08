import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <Link to="/patients" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="w-4 h-4" />
        Volver a la lista
      </Link>

      <div className="flex items-center justify-between mt-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Detalle del paciente</h1>
          <p className="mt-1 text-sm text-gray-500">ID: {id}</p>
        </div>
        <Link
          to={`/patients/${id}/edit`}
          className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
        >
          Editar
        </Link>
      </div>

      <div className="mt-6 p-8 bg-white rounded-xl border border-gray-200 shadow-sm text-center">
        <p className="text-sm text-gray-500">Expediente del paciente — pendiente de implementación</p>
      </div>
    </div>
  );
}
