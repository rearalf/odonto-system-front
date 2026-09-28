import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { DashboardLayout } from '@/shared/components/layout/DashboardLayout';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));

export const dashboardRoutes: RouteObject[] = [
  {
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
];
