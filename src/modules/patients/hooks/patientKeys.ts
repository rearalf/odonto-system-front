import type { PatientListParams } from '../types/PatientList';

/**
 * Factory de query keys del modulo patients.
 *
 * Sin esto, `invalidateQueries({ queryKey: ['patients', 5] })` refresca tambien
 * la pagina 5 del listado (prefijo), porque ambos comparten array.
 *
 *   lists()  -> ['patients', 'list']             invalida todos los listados
 *   list(p)  -> ['patients', 'list', p]          una pagina concreta
 *   detail(id)-> ['patients', 'detail', id]      una ficha concreta
 */
export const patientKeys = {
  all: ['patients'] as const,
  lists: () => [...patientKeys.all, 'list'] as const,
  list: (params: PatientListParams) =>
    [...patientKeys.lists(), params] as const,
  details: () => [...patientKeys.all, 'detail'] as const,
  detail: (id: string) => [...patientKeys.details(), id] as const,
};
