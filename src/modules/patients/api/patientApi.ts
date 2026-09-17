import { http } from '@/shared/services/http';

export const patientApi = {
  create: (formData: FormData) => http.post('/patients', formData),
};
