export const availabilityKeys = {
  all: ['doctors', 'availability'] as const,
  lists: () => [...availabilityKeys.all, 'list'] as const,
  list: (doctorId: string | number) =>
    [...availabilityKeys.lists(), doctorId] as const,
  details: () => [...availabilityKeys.all, 'detail'] as const,
  detail: (doctorId: string | number) =>
    [...availabilityKeys.details(), doctorId] as const,
};

export const slotsKeys = {
  all: ['doctors', 'slots'] as const,
  lists: () => [...slotsKeys.all, 'list'] as const,
  list: (doctorId: string | number, date: string) =>
    [...slotsKeys.lists(), doctorId, date] as const,
  details: () => [...slotsKeys.all, 'detail'] as const,
  detail: (doctorId: string | number, date: string) =>
    [...slotsKeys.details(), doctorId, date] as const,
};
