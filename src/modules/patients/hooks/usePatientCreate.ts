import { useState } from 'react';
import { format, subYears } from 'date-fns';

import { SISTEMAS_ANATOMICOS } from '@/modules/patients/constants/SistemasAnatomicos';
import { calculateAge } from '@/shared/utils/date';

export function usePatientCreate() {
  const maxBirthDate = format(subYears(new Date(), 1), 'yyyy-MM-dd');
  const [birthDate, setBirthDate] = useState(maxBirthDate);
  const [odontogramaCompletado, setOdontogramaCompletado] = useState(true);
  const [revisiones, setRevisiones] = useState<boolean[]>(
    Array(SISTEMAS_ANATOMICOS.length).fill(false),
  );
  const age = calculateAge(birthDate);

  const toggleRevision = (index: number) =>
    setRevisiones((prev) =>
      prev.map((revisado, i) => (i === index ? !revisado : revisado)),
    );

  return {
    SISTEMAS_ANATOMICOS,
    maxBirthDate,
    birthDate,
    setBirthDate,
    odontogramaCompletado,
    setOdontogramaCompletado,
    revisiones,
    age,
    toggleRevision,
  };
}