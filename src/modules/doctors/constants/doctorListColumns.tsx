import { Link } from 'react-router-dom';
import { Copy, Eye, Phone, Trash2 } from 'lucide-react';

import { Button, type TableColumn } from '@/shared/components/ui';
import type { DoctorListItem } from '@/modules/doctors/types/DoctorList';

export function buildDoctorListColumns(): TableColumn<DoctorListItem>[] {
  return [
    {
      key: 'fullName',
      header: 'Doctor',
      sortable: true,
      render: (doctor) => {
        return (
          <div className="flex items-center gap-3">
            <span className="font-medium text-text-primary">
              {doctor.fullName}
            </span>
          </div>
        );
      },
    },
    {
      key: 'phone',
      header: 'Teléfono',
      align: 'center',
      numeric: true,
      render: (doctor) => {
        const digits = String(doctor.phone ?? '').replace(/\D/g, '');
        const formatted = `${digits.slice(0, 4)} ${digits.slice(4, 8)}`;
        return (
          <div className="flex items-center gap-2">
            <Link
              to={`tel:${digits}`}
              aria-label={`Llamar a ${doctor.fullName}`}
              title={`Llamar a ${doctor.fullName}`}
            >
              <Button variant="ghost" color="info">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link
              to={`tel:${digits}`}
              aria-label={`Llamar a ${doctor.fullName}`}
              title={`Llamar a ${doctor.fullName}`}
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
      key: 'primarySpecialty',
      header: 'Especialidad',
      align: 'center',
      render: (doctor) => {
        return <span>{doctor.primarySpecialty}</span>;
      },
    },
    {
      key: 'qualification',
      header: 'Titulo / Especialidad',
      align: 'center',
      render: (doctor) => {
        const qual = doctor.qualification;
        if (!qual) {
          return <span className="text-text-secondary">—</span>;
        }
        return <span>{qual}</span>;
      },
    },
    {
      key: 'id',
      header: 'Acciones',
      align: 'center',
      render: (doctor) => {
        return (
          <div className="flex items-center justify-end gap-2">
            <Link
              to={`/doctors/${doctor.id}`}
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
              // onClick={() => onDelete(doctor)}
              // disabled={deletingId !== undefined}
              // loading={deletingId === doctor.id}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        );
      },
    },
  ];
}
