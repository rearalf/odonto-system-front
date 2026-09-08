import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { dashboardRoutes } from '@/modules/dashboard/routes';
import { patientRoutes } from '@/modules/patients/routes';
import { NotFoundPage } from './NotFoundPage';

const allRoutes: RouteObject[] = [
  {
    path: '/',
    children: [
      ...dashboardRoutes,
      ...patientRoutes,
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(allRoutes);
