'use no memo';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useCallback, useState } from 'react';
import { useCallback } from 'react';

import {
  DoctorCreateSchema,
  type DoctorCreateFormValues,
} from '@/modules/doctors/schemas/DoctorCreateSchema';
import { doctorApi } from '@/modules/doctors/api/doctorApi';
import {
  specialtiesApi,
  type Specialty,
} from '@/modules/doctors/api/specialtiesApi';
import { useSpecialtiesForSelect } from '@/modules/doctors/hooks/useSpecialties';
import {
  showApiError,
  showLoading,
  showSuccess,
} from '@/shared/components/feedback';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export function useDoctorCreate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // TODO: se usará más adelante — roles pasa a ser parte del formulario (RHF),
  // no un useState local. El catálogo vendría de rolesApi/useRolesForSelect.
  // const { roles: rolesData, isLoading: isRolesLoading } = useRolesForSelect();

  const form = useForm<DoctorCreateFormValues>({
    resolver: zodResolver(DoctorCreateSchema),
    defaultValues: {
      profilePicture: null,
      middleName: '',
      qualification: '',
      specialties: [],
      // TODO: se usará más adelante
      // email: '',
      // roles: [],
    },
  });

  const { register, control, setValue, formState } = form;
  const { errors } = formState;

  const foto = useWatch({ control, name: 'profilePicture' });
  const specialties =
    useWatch({ control, name: 'specialties' }) ??
    ([] as { specialtyId: number; isPrimary: boolean }[]);

  const {
    specialties: specialtiesData,
    isLoading: isSpecialtiesLoading,
    refetch: refetchSpecialties,
  } = useSpecialtiesForSelect();

  const fetchSpecialties = (params?: {
    page?: number;
    perPage?: number;
    search?: string;
  }) => {
    return specialtiesApi.list({ pagination: true, ...params });
  };

  const setSpecialties = useCallback(
    (items: { specialtyId: number; isPrimary: boolean }[]) =>
      setValue('specialties', items),
    [setValue],
  );

  const handleSpecialtyAdd = useCallback(
    (value: string) => {
      const option = specialtiesData?.find((s: Specialty) => s.name === value);
      if (option) {
        const currentSpecialties: {
          specialtyId: number;
          isPrimary: boolean;
        }[] = form.getValues('specialties') ?? [];
        if (!currentSpecialties.some((s) => s.specialtyId === option.id)) {
          setSpecialties([
            ...currentSpecialties,
            { specialtyId: option.id, isPrimary: false },
          ]);
        }
      }
    },
    [specialtiesData, form, setSpecialties],
  );

  const handleSpecialtyRemove = useCallback(
    (specialtyId: number) => {
      const currentSpecialties: { specialtyId: number; isPrimary: boolean }[] =
        form.getValues('specialties') ?? [];
      setSpecialties(
        currentSpecialties.filter((s) => s.specialtyId !== specialtyId),
      );
    },
    [form, setSpecialties],
  );

  const handleSpecialtySetPrimary = useCallback(
    (specialtyId: number) => {
      const currentSpecialties: { specialtyId: number; isPrimary: boolean }[] =
        form.getValues('specialties') ?? [];
      setSpecialties(
        currentSpecialties.map((s) => ({
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
      // TODO: se usará más adelante
      // if (data.email) formData.append('email', data.email);
      // if (data.roles?.length) formData.append('roles', JSON.stringify(data.roles));

      const toastId = showLoading('Guardando doctor…', {
        description: 'Creando el registro del doctor',
      });

      try {
        await doctorApi.create(formData);
        showSuccess('Doctor guardado', {
          id: toastId,
          description: 'Doctor creado correctamente',
        });
        queryClient.invalidateQueries({ queryKey: ['doctors'] });
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
    isSubmitting: formState.isSubmitting,
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
    fetchSpecialties,
    refetchSpecialties,
    // TODO: se usará más adelante
    // rolesOptions:
    //   rolesData?.map((r: Role) => ({ id: r.id, label: r.name })) ?? [],
    // isRolesLoading,
    handleSpecialtyAdd,
    handleSpecialtyRemove,
    handleSpecialtySetPrimary,
  };
}
