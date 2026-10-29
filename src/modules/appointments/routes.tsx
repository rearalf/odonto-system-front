import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { CalendarPlus } from 'lucide-react';
import { DashboardLayout } from '@/shared/components/layout/DashboardLayout';

const AppointmentCreatePage = lazy(() => import('./pages/AppointmentCreatePage'));

export const appointmentRoutes: RouteObject[] = [
  {
    path: 'appointments',
    element: <DashboardLayout />,
    handle: { name: 'Citas', icon: CalendarPlus },
    children: [
      {
        path: 'new',
        element: <AppointmentCreatePage />,
        handle: { name: 'Nueva cita', icon: CalendarPlus },
      },
    ],
  },
];
