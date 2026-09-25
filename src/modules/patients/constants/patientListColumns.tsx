import { Link } from 'react-router-dom';
import { Copy, Eye, Phone, Trash2 } from 'lucide-react';

import {
  Avatar,
  Badge,
  Button,
  type TableColumn,
} from '@/shared/components/ui';
import type { PatientListItem } from '@/modules/patients/types/PatientList';
import { GENDER_LABELS } from '../enums/GenderType';

export function buildPatientListColumns({
  onDelete,
  deletingId,
}: {
  onDelete: (patient: PatientListItem) => void;
  deletingId: number | undefined;
}): TableColumn<PatientListItem>[] {
  return [
    {
      key: 'fullName',
      header: 'Paciente',
      sortable: true,
      render: (patient) => (
        <div className="flex items-center gap-3">
          <Avatar
            name={patient.fullName}
            src={patient.avatarUrl}
            alt={`Foto de ${patient.fullName}`}
          />
          <span className="font-medium text-text-primary">
            {patient.fullName}
          </span>
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'Teléfono',
      align: 'center',
      render: (patient) => {
        const digits = patient.phone.replace(/\D/g, '');
        const formatted = `${digits.slice(0, 4)} ${digits.slice(4, 8)}`;
        return (
          <div className="flex items-center gap-2">
            <Link
              to={`tel:${digits}`}
              aria-label={`Llamar a ${patient.fullName}`}
              title="Llamar"
            >
              <Button variant="ghost" color="info">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link
              to={`tel:${digits}`}
              aria-label={`Llamar a ${patient.fullName}`}
              title="Llamar"
            >
              <span className="tabular-nums">{formatted}</span>
            </Link>
            <Button
              type="button"
              aria-label="Copiar teléfono"
              title="Copiar"
              variant="ghost"
              color="info"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(formatted);
              }}
            >
              <Copy className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        );
      },
    },
    {
      key: 'age',
      header: 'Edad',
      align: 'center',
      render: (patient) => (
        <div className="flex flex-col gap-2 items-center">
          <Badge variant="primary">{patient.age} años</Badge>
          <span className="text-text-secondary text-sm">
            {new Intl.DateTimeFormat('es', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).format(new Date(patient.birthday))}
          </span>
        </div>
      ),
    },
    {
      key: 'gender',
      header: 'Género',
      align: 'center',
      render: (patient) => (
        <Badge variant={patient.gender === 'female' ? 'default' : 'info'}>
          {GENDER_LABELS[patient.gender] ?? patient.gender}
        </Badge>
      ),
    },
    // {
    //   key: 'completeOdontogram',
    //   header: 'Odontograma',
    //   align: 'center',
    //   render: (patient) => (
    //     <Badge variant={patient.completeOdontogram ? 'success' : 'warning'}>
    //       {patient.completeOdontogram ? 'Completo' : 'Pendiente'}
    //     </Badge>
    //   ),
    // },
    {
      key: 'hasSystemicRisk',
      header: 'Riesgo sistémico',
      align: 'center',
      render: (patient) => (
        <Badge variant={patient.hasSystemicRisk ? 'warning' : 'primary'}>
          {patient.hasSystemicRisk ? 'Sí' : 'No'}
        </Badge>
      ),
    },
    {
      key: 'id',
      header: 'Acciones',
      align: 'center',
      render: (patient) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            to={`/patients/${patient.id}`}
            aria-label="Ver detalles del paciente"
          >
            <Button variant="ghost" color="info">
              <Eye className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            color="error"
            type="button"
            aria-label="Eliminar paciente"
            onClick={() => onDelete(patient)}
            disabled={deletingId !== undefined}
            loading={deletingId === patient.id}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      ),
    },
  ];
}
