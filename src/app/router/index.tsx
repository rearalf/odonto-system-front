import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { Home } from 'lucide-react';
import { dashboardRoutes } from '@/modules/dashboard/routes';
import { patientRoutes } from '@/modules/patients/routes';
import { doctorRoutes } from '@/modules/doctors/routes';
import { appointmentRoutes } from '@/modules/appointments/routes';
import { NotFoundPage } from './NotFoundPage';

const allRoutes: RouteObject[] = [
  {
    path: '/',
    handle: { name: 'Inicio', icon: Home },
    children: [
      ...dashboardRoutes,
      ...patientRoutes,
      ...doctorRoutes,
      ...appointmentRoutes,
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(allRoutes);
