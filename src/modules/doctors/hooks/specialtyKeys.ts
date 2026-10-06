import type { SpecialtyListParams } from '../types/Specialty';

export const specialtyKeys = {
  all: ['specialties'] as const,
  lists: () => [...specialtyKeys.all, 'list'] as const,
  list: (params?: SpecialtyListParams) =>
    [...specialtyKeys.lists(), params] as const,
};
