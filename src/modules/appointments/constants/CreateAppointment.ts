import { format } from 'date-fns';

export const today = () => format(new Date(), 'yyyy-MM-dd');
export const currentTime = () => format(new Date(), 'HH:mm:ss');

export const DEFAULT_VALUES = {
  isWalkIn: false,
  patientMode: 'search',
  patientId: null,
  newPatient: {
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: undefined,
    phone: '',
    completeOdontogram: true,
    medicalHistory: '',
    hasSncIssues: false,
    hasSvcIssues: false,
    hasSeIssues: false,
    hasSmeIssues: false,
    hasSrIssues: false,
    hasSuIssues: false,
    hasSguIssues: false,
    hasSgiIssues: false,
  },
  doctorId: null,
  date: today(),
  slot: null,
  startTime: currentTime(),
  duration: 30,
  reason: '',
  notes: '',
};
