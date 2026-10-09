'use no memo';

import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';

import {
  DoctorCreateSchema,
  type DoctorCreateFormValues,
} from '@/modules/doctors/schemas/DoctorCreateSchema';
import { useDoctorDetailQuery } from '@/modules/doctors/hooks/queries/useDoctorDetailQuery';
import { useDoctorUpdateMutation } from '@/modules/doctors/hooks/mutations/useDoctorUpdateMutation';
import { useSpecialtiesForSelect } from '@/modules/doctors/hooks/queries/useSpecialtiesQuery';
import type { DoctorDetail } from '@/modules/doctors/types/Doctor';
import type { Specialty } from '@/modules/doctors/types/Specialty';
import {
  showApiError,
  showLoading,
  showSuccess,
} from '@/shared/components/feedback';

type SpecialtyItem = { specialtyId: number; isPrimary: boolean };

function toFormValues(detail: DoctorDetail): DoctorCreateFormValues {
  return {
    profilePicture: null,
    firstName: detail.person.firstName ?? '',
    middleName: detail.person.middleName ?? '',
    lastName: detail.person.lastName ?? '',
    // el backend puede devolver phone con formato; el formulario trabaja con 8 digitos
    phone: String(detail.person.phone ?? '').replace(/\D/g, ''),
    qualification: detail.qualification ?? '',
    specialties: detail.specialties.map((s) => ({
      specialtyId: s.specialtyId,
      isPrimary: s.isPrimary,
    })),
  };
}

export function useDoctorEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const updateDoctor = useDoctorUpdateMutation();

  const { data, isError, error } = useDoctorDetailQuery(id);

  const form = useForm<DoctorCreateFormValues>({
    resolver: zodResolver(DoctorCreateSchema),
    defaultValues: {
      profilePicture: null,
      firstName: '',
      middleName: '',
      lastName: '',
      phone: '',
      qualification: '',
      specialties: [],
    },
  });

  const { register, control, setValue, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    if (data) form.reset(toFormValues(data));
  }, [data, form]);

  useEffect(() => {
    if (isError) showApiError(error);
  }, [isError, error]);

  const foto = useWatch({ control, name: 'profilePicture' });
  const specialties = useWatch({ control, name: 'specialties' }) ?? [];

  const { data: specialtiesData, isLoading: isSpecialtiesLoading } =
    useSpecialtiesForSelect();

  const setSpecialties = (items: SpecialtyItem[]) =>
    setValue('specialties', items);

  const handleSpecialtyAdd = (value: string) => {
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
  };

  const handleSpecialtyRemove = (specialtyId: number) => {
    const current = form.getValues('specialties') ?? [];
    setSpecialties(current.filter((s) => s.specialtyId !== specialtyId));
  };

  const handleSpecialtySetPrimary = (specialtyId: number) => {
    const current = form.getValues('specialties') ?? [];
    setSpecialties(
      current.map((s) => ({
        ...s,
        isPrimary: s.specialtyId === specialtyId,
      })),
    );
  };

  const setFoto = (file: File | null) =>
    setValue('profilePicture', file, { shouldValidate: true });

  const onSubmit = form.handleSubmit(async (data) => {
    if (!id) return;

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
    formData.append('specialties', JSON.stringify(data.specialties ?? []));

    const toastId = showLoading('Guardando cambios…', {
      description: 'Actualizando el registro del doctor',
    });

    try {
      await updateDoctor.mutateAsync({ id, formData });
      showSuccess('Doctor actualizado', {
        id: toastId,
        description: 'Los cambios se guardaron correctamente',
      });
      // navigate(`/doctors/${id}`);
    } catch (err) {
      showApiError(err, { id: toastId });
    }
  });

  const handleCancel = () => {
    navigate(`/doctors/${id}`);
  };

  const fullName = data
    ? [data.person.firstName, data.person.middleName, data.person.lastName]
        .filter(Boolean)
        .join(' ')
    : undefined;

  return {
    register,
    control,
    errors,
    isSubmitting: formState.isSubmitting || updateDoctor.isPending,
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
    handleSpecialtyAdd,
    handleSpecialtyRemove,
    handleSpecialtySetPrimary,
    id,
    fullName,
    isLoading: !data && !isError,
  };
}
