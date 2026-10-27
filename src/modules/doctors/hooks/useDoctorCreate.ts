'use no memo';

import { useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import {
  DoctorCreateSchema,
  type DoctorCreateFormValues,
} from '@/modules/doctors/schemas/DoctorCreateSchema';
import { useDoctorCreateMutation } from '@/modules/doctors/hooks/mutations/useDoctorCreateMutation';
import { useSpecialtiesForSelect } from '@/modules/doctors/hooks/queries/useSpecialtiesQuery';
import type { Specialty } from '@/modules/doctors/types/Specialty';
import {
  showApiError,
  showLoading,
  showSuccess,
} from '@/shared/components/feedback';

// TODO: se usará más adelante — roles pasa a ser parte del formulario (RHF),
// no un useState local. El catálogo vendría de rolesApi/useRolesForSelect.

type SpecialtyItem = { specialtyId: number; isPrimary: boolean };

export function useDoctorCreate() {
  const navigate = useNavigate();
  const createDoctor = useDoctorCreateMutation();

  const form = useForm<DoctorCreateFormValues>({
    resolver: zodResolver(DoctorCreateSchema),
    defaultValues: {
      profilePicture: null,
      middleName: '',
      qualification: '',
      specialties: [],
    },
  });

  const { register, control, setValue, formState } = form;
  const { errors } = formState;

  const foto = useWatch({ control, name: 'profilePicture' });
  const specialties = useWatch({ control, name: 'specialties' }) ?? [];

  const { data: specialtiesData, isLoading: isSpecialtiesLoading } =
    useSpecialtiesForSelect();

  const setSpecialties = useCallback(
    (items: SpecialtyItem[]) => setValue('specialties', items),
    [setValue],
  );

  const handleSpecialtyAdd = useCallback(
    (value: string) => {
      const option = specialtiesData?.find((s: Specialty) => s.name === value);
      if (option) {
        const current = form.getValues('specialties') ?? [];
        if (!current.some((s) => s.specialtyId === option.id)) {
          setSpecialties([
            ...current,
            { specialtyId: option.id, isPrimary: false },
          ]);
        }
      }
    },
    [specialtiesData, form, setSpecialties],
  );

  const handleSpecialtyRemove = useCallback(
    (specialtyId: number) => {
      const current = form.getValues('specialties') ?? [];
      setSpecialties(current.filter((s) => s.specialtyId !== specialtyId));
    },
    [form, setSpecialties],
  );

  const handleSpecialtySetPrimary = useCallback(
    (specialtyId: number) => {
      const current = form.getValues('specialties') ?? [];
      setSpecialties(
        current.map((s) => ({
          ...s,
          isPrimary: s.specialtyId === specialtyId,
        })),
      );
    },
    [form, setSpecialties],
  );

  const setFoto = (file: File | null) =>
    setValue('profilePicture', file, { shouldValidate: true });

  const onSubmit = form.handleSubmit(
    async (data) => {
      const formData = new FormData();

      if (data.profilePicture) {
        formData.append('profilePicture', data.profilePicture);
      }
      if (data.firstName) formData.append('firstName', data.firstName);
      if (data.middleName) formData.append('middleName', data.middleName);
      if (data.lastName) formData.append('lastName', data.lastName);
      if (data.phone) formData.append('phone', data.phone);
      if (data.qualification)
        formData.append('qualification', data.qualification);
      if (data.specialties && data.specialties.length > 0) {
        formData.append('specialties', JSON.stringify(data.specialties));
      }

      const toastId = showLoading('Guardando doctor…', {
        description: 'Creando el registro del doctor',
      });

      try {
        await createDoctor.mutateAsync(formData);
        showSuccess('Doctor guardado', {
          id: toastId,
          description: 'Doctor creado correctamente',
        });
        navigate('/doctors');
      } catch (error) {
        showApiError(error, { id: toastId });
      }
    },
    (_validationErrors) => {},
  );

  const handleCancel = () => {
    navigate('/doctors');
  };

  return {
    register,
    control,
    errors,
    isSubmitting: formState.isSubmitting || createDoctor.isPending,
    onSubmit,
    handleCancel,
    setFoto,
    setSpecialties,
    foto,
    specialties,
    specialtiesOptions:
      specialtiesData?.map((s: Specialty) => ({
        id: s.id,
        value: s.name,
        label: s.name,
        description: s.description,
      })) ?? [],
    isSpecialtiesLoading,
    // TODO: se usará más adelante
    // rolesOptions:
    //   rolesData?.map((r: Role) => ({ id: r.id, label: r.name })) ?? [],
    // isRolesLoading,
    handleSpecialtyAdd,
    handleSpecialtyRemove,
    handleSpecialtySetPrimary,
  };
}
