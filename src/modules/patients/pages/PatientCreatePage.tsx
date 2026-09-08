import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PatientCreatePage() {
  return (
    <div>
      <Link to="/patients" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="w-4 h-4" />
        Volver a la lista
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-gray-900">Nuevo paciente</h1>
      <p className="mt-1 text-sm text-gray-500">Registrar datos del paciente</p>

      <div className="mt-6 p-8 bg-white rounded-xl border border-gray-200 shadow-sm text-center">
        <p className="text-sm text-gray-500">Formulario de registro — pendiente de implementación</p>
      </div>
    </div>
  );
}
