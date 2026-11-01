import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { CalendarPlus, Calendar, Pencil } from 'lucide-react';
import { DashboardLayout } from '@/shared/components/layout/DashboardLayout';

const AppointmentListPage = lazy(() => import('./pages/AppointmentListPage'));
const AppointmentCreatePage = lazy(
  () => import('./pages/AppointmentCreatePage'),
);
const AppointmentDetailPage = lazy(
  () => import('./pages/AppointmentDetailPage'),
);
const AppointmentEditPage = lazy(() => import('./pages/AppointmentEditPage'));

export const appointmentRoutes: RouteObject[] = [
  {
    path: 'appointments',
    element: <DashboardLayout />,
    handle: { name: 'Citas', icon: CalendarPlus },
    children: [
      { index: true, element: <AppointmentListPage /> },
      {
        path: 'new',
        element: <AppointmentCreatePage />,
        handle: { name: 'Nueva cita', icon: CalendarPlus },
      },
      {
        path: ':id',
        element: <AppointmentDetailPage />,
        handle: { name: 'Detalle de cita', icon: Calendar },
      },
      {
        path: ':id/edit',
        element: <AppointmentEditPage />,
        handle: { name: 'Editar cita', icon: Pencil },
      },
    ],
  },
];
