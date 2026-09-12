import Breadcrumbs from '@/shared/components/ui/Breadcrumbs';

export default function PatientCreatePage() {
  return (
    <div>
      <Breadcrumbs />

      <h1 className="text-2xl font-bold text-gray-900">Nuevo paciente</h1>
      <p className="mt-1 text-sm text-gray-500">Registrar datos del paciente</p>

      <div className="mt-6 p-8 bg-white rounded-xl border border-gray-200 shadow-sm text-center">
        <p className="text-sm text-gray-500">
          Formulario de registro — pendiente de implementación
        </p>
      </div>
    </div>
  );
}
