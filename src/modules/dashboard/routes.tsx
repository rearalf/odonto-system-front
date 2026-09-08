import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));

export const dashboardRoutes: RouteObject[] = [
  {
    index: true,
    element: <DashboardPage />,
  },
];
