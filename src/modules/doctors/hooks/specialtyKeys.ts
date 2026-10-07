import type { ListParams } from '@/shared/types/baseInterfaces';

export const specialtyKeys = {
  all: ['specialties'] as const,
  lists: () => [...specialtyKeys.all, 'list'] as const,
  list: (params?: ListParams) => [...specialtyKeys.lists(), params] as const,
};
