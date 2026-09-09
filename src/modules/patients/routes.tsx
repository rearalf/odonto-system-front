import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { DashboardLayout } from '@/shared/components/layout/DashboardLayout';

const PatientListPage = lazy(() => import('./pages/PatientListPage'));
const PatientCreatePage = lazy(() => import('./pages/PatientCreatePage'));
const PatientDetailPage = lazy(() => import('./pages/PatientDetailPage'));
const PatientEditPage = lazy(() => import('./pages/PatientEditPage'));

export const patientRoutes: RouteObject[] = [
  {
    path: 'patients',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <PatientListPage /> },
      { path: 'new', element: <PatientCreatePage /> },
      { path: ':id', element: <PatientDetailPage /> },
      { path: ':id/edit', element: <PatientEditPage /> },
    ],
  },
];
