import { format } from 'date-fns';

export const today = () => format(new Date(), 'yyyy-MM-dd');
export const currentTime = () => format(new Date(), 'HH:mm:ss');

export const DEFAULT_VALUES = {
  isWalkIn: false,
  patientMode: 'search',
  patientId: null,
  newPatient: {
    profilePicture: null,
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1))
      .toISOString()
      .slice(0, 10),
    gender: undefined,
    phone: '',
    occupation: '',
    address: '',
    completeOdontogram: true,
    medicalHistory: '',
    allergicReactions: '',
    currentSystemicTreatment: '',
    labResults: '',
    systemEvaluationNotes: '',
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
  statusId: 1,
  allow_overbooking: false,
};
