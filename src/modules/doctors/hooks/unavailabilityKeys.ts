import type { UnavailabilityListParams } from '../types/Unavailability';

export const unavailabilityKeys = {
  all: ['doctors', 'unavailability'] as const,
  lists: () => [...unavailabilityKeys.all, 'list'] as const,
  list: (params: UnavailabilityListParams) =>
    [...unavailabilityKeys.lists(), params] as const,
  details: () => [...unavailabilityKeys.all, 'detail'] as const,
  detail: (doctorId: string | number, id: number) =>
    [...unavailabilityKeys.details(), doctorId, id] as const,
};
