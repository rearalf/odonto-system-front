import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const PatientListPage = lazy(() => import('./pages/PatientListPage'));
const PatientCreatePage = lazy(() => import('./pages/PatientCreatePage'));
const PatientDetailPage = lazy(() => import('./pages/PatientDetailPage'));
const PatientEditPage = lazy(() => import('./pages/PatientEditPage'));

export const patientRoutes: RouteObject[] = [
  {
    path: 'patients',
    children: [
      { index: true, element: <PatientListPage /> },
      { path: 'new', element: <PatientCreatePage /> },
      { path: ':id', element: <PatientDetailPage /> },
      { path: ':id/edit', element: <PatientEditPage /> },
    ],
  },
];
