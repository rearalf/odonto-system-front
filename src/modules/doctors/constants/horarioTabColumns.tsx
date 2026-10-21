import { Edit, Trash2, Eye } from 'lucide-react';
import { Button, type TableColumn } from '@/shared/components/ui';
import type { RowData } from '../types/HorarioTab';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const formatDateTimeAMPM = (iso: string) =>
  format(new Date(iso), 'EEE dd/MM/yyyy, h:mm a', { locale: es }).replace(
    /^\w/,
    (c) => c.toUpperCase(),
  );

const truncate = (text: string, max = 40) =>
  text.length > max ? text.slice(0, max) + '…' : text;

const formatTimeOnly = (timeStr: string) => {
  const d = timeStr.includes('T') ? new Date(timeStr) : null;
  if (d && !isNaN(d.getTime())) {
    return format(d, 'HH:mm a', { locale: es });
  }
  return timeStr.slice(0, 5);
};

export function buildRecurrentesColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (row: RowData) => void;
  onDelete: (row: RowData) => void;
}): TableColumn<RowData>[] {
  return [
    { key: 'day', header: 'Día' },
    {
      key: 'startTime',
      header: 'Hora Inicio',
      sortable: true,
      align: 'center',
      render: (r) => formatTimeOnly(r.startTime),
    },
    {
      key: 'endTime',
      header: 'Hora Fin',
      sortable: true,
      align: 'center',
      render: (r) => formatTimeOnly(r.endTime),
    },
    {
      key: 'slotDuration',
      header: 'Duración',
      align: 'center',
      render: (r) => (r.slotDuration ? `${r.slotDuration} min` : '—'),
    },
    {
      key: 'maxPatientsPerSlot',
      header: 'Máx. Pacientes',
      align: 'center',
      render: (r) => r.maxPatientsPerSlot?.toString() ?? '—',
    },
    {
      key: 'id',
      header: 'Acciones',
      align: 'center',
      render: (r) => (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            title="Editar"
            onClick={() => onEdit(r)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            color="error"
            title="Eliminar"
            onClick={() => onDelete(r)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
}

export function createUnavailabilityTableColumns({
  onView,
  onDelete,
  onEdit,
}: {
  onView?: (row: RowData) => void;
  onDelete: (row: RowData) => void;
  onEdit?: (row: RowData) => void;
}): TableColumn<RowData>[] {
  return [
    {
      key: 'startTime',
      header: 'Fecha inicio',
      sortable: true,
      render: (r) => formatDateTimeAMPM(r.startTime),
    },
    {
      key: 'endTime',
      header: 'Fecha fin',
      sortable: true,
      render: (r) => formatDateTimeAMPM(r.endTime),
    },
    {
      key: 'reason',
      header: 'Motivo',
      render: (r) => {
        const full = r.reason ?? '—';
        const short = truncate(full);
        return <span title={full}>{short}</span>;
      },
    },
    {
      key: 'id',
      header: 'Acciones',
      align: 'center',
      render: (r) => (
        <div className="flex items-center justify-center gap-2">
          {onView && (
            <Button
              variant="ghost"
              size="sm"
              title="Ver detalles"
              onClick={() => onView(r)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              title="Editar"
              onClick={() => onEdit(r)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            color="error"
            title="Eliminar"
            onClick={() => onDelete(r)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
}
