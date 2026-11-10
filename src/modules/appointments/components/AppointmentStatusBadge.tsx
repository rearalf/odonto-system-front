import { Badge } from '@/shared/components/ui';

import type { AppointmentStatus } from '@/modules/appointments/types';
import { DEFAULT_STATUS_COLOR } from '@/modules/appointments/constants/appointment-status';

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus;
  className?: string;
}

export function AppointmentStatusBadge({
  status,
  className = '',
}: AppointmentStatusBadgeProps) {
  return (
    <Badge
      variant="default"
      className={`${className} font-medium`}
      style={{
        backgroundColor: status.color ?? DEFAULT_STATUS_COLOR,
        color: '#fff',
      }}
    >
      {status.description}
    </Badge>
  );
}