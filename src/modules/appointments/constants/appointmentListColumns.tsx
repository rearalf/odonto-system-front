import { Link } from 'react-router-dom';
import { Clock, Eye, Pencil, Trash2 } from 'lucide-react';

import { Badge, Button, type TableColumn } from '@/shared/components/ui';
import type { AppointmentListItem } from '@/modules/appointments/types';
import type { AppointmentStatus } from '@/modules/appointments/types';
import {
  getStatusLabel,
  getStatusColor,
} from '@/modules/appointments/constants/appointment-status';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;

export function buildAppointmentListColumns({
  onDelete,
  deletingId,
  statuses,
}: {
  onDelete: (appointment: AppointmentListItem) => void;
  deletingId: number | undefined;
  statuses: AppointmentStatus[];
}): TableColumn<AppointmentListItem>[] {
  return [
    {
      key: 'patientFullName',
      header: 'Paciente',
      sortable: true,
      render: (appointment) => (
        <div className="font-medium text-text-primary">
          {appointment.patientFullName}
        </div>
      ),
    },
    {
      key: 'doctorFullName',
      header: 'Doctor',
      sortable: true,
      render: (appointment) => (
        <div className="text-text-primary">{appointment.doctorFullName}</div>
      ),
    },
    {
      key: 'startTime',
      header: 'Inicio',
      sortable: true,
      align: 'center',
      render: (appointment) => (
        <div className="flex flex-col gap-1 items-center">
          <span className="font-mono tabular-nums text-body-md">
            {new Intl.DateTimeFormat('es', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }).format(new Date(appointment.startTime))}
          </span>
          <span className="text-text-secondary text-xs">
            {new Intl.DateTimeFormat('es', { weekday: 'short' }).format(
              new Date(appointment.startTime),
            )}
          </span>
        </div>
      ),
    },
    {
      key: 'durationMinutes',
      header: 'Duración',
      align: 'center',
      render: (appointment) => (
        <div className="flex items-center justify-center gap-1">
          <Clock className="h-3.5 w-3.5 text-text-muted" aria-hidden="true" />
          <span className="tabular-nums text-body-md">
            {appointment.durationMinutes} min
          </span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Estado',
      align: 'center',
      sortable: true,
      render: (appointment) => {
        const label = getStatusLabel(statuses, appointment.status);
        const color = getStatusColor(statuses, appointment.status);

        return (
          <span
            className="inline-flex items-center gap-1.5 rounded-full font-medium text-xs px-2.5 py-0.5 text-white text-capitalize"
            style={{ backgroundColor: color }}
          >
            {label}
          </span>
        );
      },
    },
    {
      key: 'reason',
      header: 'Motivo',
      sortable: true,
      render: (appointment) => (
        <div className="max-w-xs truncate" title={appointment.reason}>
          {appointment.reason}
        </div>
      ),
    },
    {
      key: 'rescheduled',
      header: 'Reagendada',
      align: 'center',
      render: (appointment) => (
        <Badge variant={appointment.rescheduled ? 'warning' : 'default'}>
          {appointment.rescheduled ? 'Sí' : 'No'}
        </Badge>
      ),
    },
    {
      key: 'id',
      header: 'Acciones',
      align: 'center',
      render: (appointment) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            to={`/appointments/${appointment.id}`}
            aria-label="Ver detalles de la cita"
          >
            <Button variant="ghost" color="info">
              <Eye className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
          <Link
            to={`/appointments/${appointment.id}/edit`}
            aria-label="Editar cita"
          >
            <Button variant="ghost" color="primary">
              <Pencil className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            color="error"
            type="button"
            aria-label="Eliminar cita"
            onClick={() => onDelete(appointment)}
            disabled={deletingId !== undefined}
            loading={deletingId === appointment.id}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      ),
    },
  ];
}

export const sortOrderOptions = [
  { id: 'ASC' as const, label: 'Ascendente', data: 'ASC' },
  { id: 'DESC' as const, label: 'Descendente', data: 'DESC' },
];
