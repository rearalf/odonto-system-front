'use no memo';

import { PatientFormSections } from '@/modules/patients/components/PatientFormSections';
import { usePatientEdit } from '@/modules/patients/hooks/usePatientEdit';
import { Breadcrumbs } from '@/shared/components/ui';

export default function PatientEditPage() {
  const formProps = usePatientEdit();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Pacientes', href: '/patients' },
          {
            label: `Editar ${formProps.patientName ?? 'ficha del Paciente'}`,
          },
        ]}
      />

      <h1 className="mt-4 text-headline-lg font-bold text-text-primary">
        Editar paciente
      </h1>
      <p className="mt-1 text-body-md text-text-muted">
        Actualice los datos del expediente clínico. Los campos marcados con (
        <span className="text-orange-400">*</span>) son obligatorios para el
        expediente clínico y la asignación del número de historia.
      </p>

      <PatientFormSections
        {...formProps}
        submitLabel="Guardar cambios"
        cancelLabel="Cancelar"
      />
    </>
  );
}
