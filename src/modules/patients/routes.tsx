import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { Users, UserPlus, FileText, Pencil } from 'lucide-react';
import { DashboardLayout } from '@/shared/components/layout/DashboardLayout';

const PatientListPage = lazy(() => import('./pages/PatientListPage'));
const PatientCreatePage = lazy(() => import('./pages/PatientCreatePage'));
const PatientDetailPage = lazy(() => import('./pages/PatientDetailPage'));
const PatientEditPage = lazy(() => import('./pages/PatientEditPage'));

export const patientRoutes: RouteObject[] = [
  {
    path: 'patients',
    element: <DashboardLayout />,
    handle: { name: 'Pacientes', icon: Users },
    children: [
      { index: true, element: <PatientListPage /> },
      {
        path: 'new',
        element: <PatientCreatePage />,
        handle: { name: 'Nuevo Registro', icon: UserPlus },
      },
      {
        path: ':id',
        element: <PatientDetailPage />,
        handle: { name: 'Ficha del Paciente', icon: FileText },
      },
      {
        path: ':id/edit',
        element: <PatientEditPage />,
        handle: { name: 'Editar', icon: Pencil },
      },
    ],
  },
];
