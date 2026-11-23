import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

import PrivateLayout from '@/shared/components/layout/PrivateLayout';

const RadiographyReportPage = lazy(
  () => import('./pages/RadiographyReportPage'),
);

export const radiographyReportRoutes: RouteObject[] = [
  {
    path: 'rx-reports',
    element: <PrivateLayout />,
    children: [{ index: true, element: <RadiographyReportPage /> }],
  },
];
