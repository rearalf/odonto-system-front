'use no memo';

import { Breadcrumbs } from '@/shared/components/ui';
import { PatientFormSections } from '@/modules/patients/components/PatientFormSections';
import { usePatientCreate } from '@/modules/patients/hooks/usePatientCreate';

function PatientCreatePage() {
  const formProps = usePatientCreate();

  return (
    <div>
      <Breadcrumbs />

      <h1 className="mt-4 text-headline-lg font-bold text-text-primary">
        Nuevo paciente
      </h1>
      <p className="mt-1 text-body-md text-text-muted">
        Complete la información requerida del paciente. Los campos marcados con
        (<span className="text-orange-400">*</span>) son obligatorios para la
        apertura oficial del expediente clínico y la asignación del número de
        historia.
      </p>

      <PatientFormSections {...formProps} />
    </div>
  );
}

export default PatientCreatePage;