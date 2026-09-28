import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { Stethoscope, UserPlus, FileText, Pencil } from 'lucide-react';
import { DashboardLayout } from '@/shared/components/layout/DashboardLayout';

const DoctorListPage = lazy(() => import('./pages/DoctorListPage'));
const DoctorCreatePage = lazy(() => import('./pages/DoctorCreatePage'));
const DoctorDetailPage = lazy(() => import('./pages/DoctorDetailPage'));
const DoctorEditPage = lazy(() => import('./pages/DoctorEditPage'));

export const doctorRoutes: RouteObject[] = [
  {
    path: 'doctors',
    element: <DashboardLayout />,
    handle: { name: 'Doctores', icon: Stethoscope },
    children: [
      { index: true, element: <DoctorListPage /> },
      {
        path: 'new',
        element: <DoctorCreatePage />,
        handle: { name: 'Nuevo Registro', icon: UserPlus },
      },
      {
        path: ':id',
        element: <DoctorDetailPage />,
        handle: { name: 'Ficha del Doctor', icon: FileText },
      },
      {
        path: ':id/edit',
        element: <DoctorEditPage />,
        handle: { name: 'Editar', icon: Pencil },
      },
    ],
  },
];
