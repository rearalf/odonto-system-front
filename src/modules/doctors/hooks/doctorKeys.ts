import type { DoctorListParams } from '../types/DoctorList';

/**
 * Factory de query keys del modulo doctors.
 *
 *   lists()   -> ['doctors', 'list']            invalida todos los listados
 *   list(p)   -> ['doctors', 'list', p]         una pagina concreta
 *   detail(id)-> ['doctors', 'detail', id]      un doctor concreto
 */
export const doctorKeys = {
  all: ['doctors'] as const,
  lists: () => [...doctorKeys.all, 'list'] as const,
  list: (params: DoctorListParams) =>
    [...doctorKeys.lists(), params] as const,
  details: () => [...doctorKeys.all, 'detail'] as const,
  detail: (id: string) => [...doctorKeys.details(), id] as const,
};

export const specialtyKeys = {
  all: ['specialties'] as const,
  list: (params?: unknown) =>
    params ? ([...specialtyKeys.all, params] as const) : specialtyKeys.all,
};
