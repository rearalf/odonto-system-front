import type { DoctorListParams } from '../types/DoctorList';

/**
 * Factory de query keys del modulo doctors.
 *
 * Sin esto, `invalidateQueries({ queryKey: ['doctors', 5] })` refresca tambien
 * la pagina 5 del listado (prefijo), porque ambos comparten array.
 *
 *   lists()  -> ['doctors', 'list']             invalida todos los listados
 *   list(p)  -> ['doctors', 'list', p]          una pagina concreta
 *   detail(id)-> ['doctors', 'detail', id]      una ficha concreta
 */
export const doctorKeys = {
  all: ['doctors'] as const,
  lists: () => [...doctorKeys.all, 'list'] as const,
  list: (params: DoctorListParams) =>
    [...doctorKeys.lists(), params] as const,
  details: () => [...doctorKeys.all, 'detail'] as const,
  detail: (id: string) => [...doctorKeys.details(), id] as const,
};