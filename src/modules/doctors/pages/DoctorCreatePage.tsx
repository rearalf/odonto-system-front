import { Breadcrumbs } from '@/shared/components/ui';
import { useDoctorCreate } from '@/modules/doctors/hooks/useDoctorCreate';
import DoctorForm from '@/modules/doctors/components/DoctorForm';

export default function DoctorCreatePage() {
  const formProps = useDoctorCreate();

  return (
    <>
      <Breadcrumbs />

      <h1 className="mt-4 text-headline-lg font-bold text-text-primary">
        Nuevo Doctor
      </h1>
      <p className="mt-1 text-body-md text-text-muted">
        Complete la información requerida del doctor. Los campos marcados con (
        <span className="text-orange-400">*</span>) son obligatorios para la
        apertura oficial.
      </p>

      <DoctorForm {...formProps} />
    </>
  );
}
