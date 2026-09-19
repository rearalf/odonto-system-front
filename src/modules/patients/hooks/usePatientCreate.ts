import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, subYears } from 'date-fns';

import {
  PatientCreateSchema,
  type PatientCreateFormValues,
} from '@/modules/patients/schemas/PatientCreateSchema';
import {
  SISTEMAS_ANATOMICOS,
  type PatientSystemDtoKey,
} from '@/modules/patients/constants/SistemasAnatomicos';
import { calculateAge } from '@/shared/utils/date';
import { patientApi } from '@/modules/patients/api/patientApi';
import {
  showApiError,
  showLoading,
  showSuccess,
} from '@/shared/components/feedback';
import { useNavigate } from 'react-router-dom';

export function usePatientCreate() {
  const maxBirthDate = format(subYears(new Date(), 1), 'yyyy-MM-dd');
  const navigate = useNavigate();

  const form = useForm<PatientCreateFormValues>({
    resolver: zodResolver(PatientCreateSchema),
    defaultValues: {
      profilePicture: null,
      middleName: '',
      occupation: '',
      address: '',
      medicalHistory: '',
      allergicReactions: '',
      currentSystemicTreatment: '',
      labResults: '',
      systemEvaluationNotes: '',
      birthDate: maxBirthDate,
      phone: '',
      gender: undefined,
      completeOdontogram: true,
      hasSncIssues: false,
      hasSvcIssues: false,
      hasSeIssues: false,
      hasSmeIssues: false,
      hasSrIssues: false,
      hasSuIssues: false,
      hasSguIssues: false,
      hasSgiIssues: false,
    },
  });

  const { register, control, setValue, getValues, formState } = form;
  const { errors } = formState;

  const birthDate = useWatch({ control, name: 'birthDate' });
  const completeOdontogram = useWatch({ control, name: 'completeOdontogram' });
  const foto = useWatch({ control, name: 'profilePicture' });

  const sistemaChecked: Record<PatientSystemDtoKey, boolean> = {
    hasSncIssues: useWatch({ control, name: 'hasSncIssues' }),
    hasSvcIssues: useWatch({ control, name: 'hasSvcIssues' }),
    hasSeIssues: useWatch({ control, name: 'hasSeIssues' }),
    hasSmeIssues: useWatch({ control, name: 'hasSmeIssues' }),
    hasSrIssues: useWatch({ control, name: 'hasSrIssues' }),
    hasSuIssues: useWatch({ control, name: 'hasSuIssues' }),
    hasSguIssues: useWatch({ control, name: 'hasSguIssues' }),
    hasSgiIssues: useWatch({ control, name: 'hasSgiIssues' }),
  };

  const sistemas = SISTEMAS_ANATOMICOS.map((sistema) => ({
    ...sistema,
    checked: sistemaChecked[sistema.dtoKey],
    toggle: () => toggleSistema(sistema.dtoKey),
  }));

  const age = calculateAge(birthDate);

  const setBirthDate = (value: string) => setValue('birthDate', value);
  const setCompleteOdontogram = (checked: boolean) =>
    setValue('completeOdontogram', checked);
  const setFoto = (file: File | null) =>
    setValue('profilePicture', file, { shouldValidate: true });
  const toggleSistema = (dtoKey: PatientSystemDtoKey) =>
    setValue(dtoKey, !getValues(dtoKey));

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    if (data.profilePicture) {
      formData.append('profilePicture', data.profilePicture);
    }
    for (const [key, value] of Object.entries(data)) {
      if (key === 'profilePicture' || value === '' || value == null) continue;
      formData.append(key, String(value));
    }
    const toastId = showLoading('Guardando paciente…', {
      description: 'Creando el expediente clínico',
    });
    try {
      await patientApi.create(formData);
      showSuccess('Paciente guardado', {
        id: toastId,
        description: 'Paciente creado correctamente',
      });
      navigate('/patients');
    } catch (error) {
      showApiError(error, { id: toastId });
    }
  });

  const handleCancel = () => {
    navigate('/patients');
  };

  return {
    register,
    control,
    errors,
    isSubmitting: formState.isSubmitting,
    onSubmit,
    setBirthDate,
    setCompleteOdontogram,
    handleCancel,
    setFoto,
    sistemas,
    birthDate,
    completeOdontogram,
    foto,
    age,
    maxBirthDate,
  };
}
