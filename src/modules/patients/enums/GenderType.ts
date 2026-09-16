export const GenderType = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
} as const;

export type GenderType = (typeof GenderType)[keyof typeof GenderType];
