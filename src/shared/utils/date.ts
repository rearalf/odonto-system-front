import { differenceInYears, parseISO } from 'date-fns';

export const calculateAge = (birthDate: string, asOf = new Date()): number | null =>
  birthDate ? differenceInYears(asOf, parseISO(birthDate)) : null;