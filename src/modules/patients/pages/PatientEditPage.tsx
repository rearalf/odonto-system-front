import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PatientEditPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <Link to={`/patients/${id}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="w-4 h-4" />
        Volver al detalle
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-gray-900">Editar paciente</h1>
      <p className="mt-1 text-sm text-gray-500">ID: {id}</p>

      <div className="mt-6 p-8 bg-white rounded-xl border border-gray-200 shadow-sm text-center">
        <p className="text-sm text-gray-500">Formulario de edición — pendiente de implementación</p>
      </div>
    </div>
  );
}
