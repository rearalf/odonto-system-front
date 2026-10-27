import { Breadcrumbs } from '@/shared/components/ui';
import { useDoctorEdit } from '@/modules/doctors/hooks/useDoctorEdit';
import DoctorForm from '@/modules/doctors/components/DoctorForm';

export default function DoctorEditPage() {
  const formProps = useDoctorEdit();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Doctores', href: '/doctors' },
          {
            label: `Ficha del Doctor ${formProps.fullName ?? ''}`,
            href: '/doctors/' + formProps.id,
          },
          { label: 'Editar' },
        ]}
      />

      <h1 className="mt-4 text-headline-lg font-bold text-text-primary">
        Editar Doctor
      </h1>
      <p className="mt-1 text-body-md text-text-muted">
        Actualice la información del doctor. Los campos marcados con (
        <span className="text-orange-400">*</span>) son obligatorios.
      </p>

      <DoctorForm
        {...formProps}
        submitLabel="Guardar cambios"
        submittingLabel="Guardando..."
      />
    </>
  );
}
