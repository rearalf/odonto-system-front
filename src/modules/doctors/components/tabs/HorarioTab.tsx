import { useState } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  CalendarClock,
  CalendarDays,
  AlertTriangle,
} from 'lucide-react';

import { Table, Button, Badge, Modal, NavTabs } from '@/shared/components/ui';
import { RecurrenteModal } from '@/modules/doctors/components/modals/RecurrenteModal';
import { ExcepcionModal } from '@/modules/doctors/components/modals/ExcepcionModal';
import { useDoctorAvailabilityQuery } from '@/modules/doctors/hooks/queries/useDoctorAvailabilityQuery';
import { useDoctorUnavailabilityQuery } from '@/modules/doctors/hooks/queries/useDoctorUnavailabilityQuery';
import { useDoctorAvailabilityDeleteMutation } from '@/modules/doctors/hooks/mutations/useDoctorAvailabilityDeleteMutation';
import { useDoctorUnavailabilityDeleteMutation } from '@/modules/doctors/hooks/mutations/useDoctorUnavailabilityDeleteMutation';
import {
  showLoading,
  showSuccess,
  showApiError,
} from '@/shared/components/feedback';
import { Link } from 'react-router-dom';
import type { AvailabilityBlock } from '@/modules/doctors/types/Availability';
import type { Unavailability } from '@/modules/doctors/types/Unavailability';

interface HorarioTabProps {
  doctorId: string | number;
}

type BlockType = 'recurrente' | 'excepcion';
type FilterTabKey = 'todos' | 'recurrentes' | 'excepciones';

interface UnifiedBlock {
  id: number;
  startTime: string;
  endTime: string;
  slotDuration?: number;
  maxPatientsPerSlot?: number;
  isRecurring: boolean;
  dayOfWeek?: number;
  specificDate?: string | null;
  reason?: string;
  type: BlockType;
}

type RowData = UnifiedBlock & { day: string };

export default function HorarioTab({ doctorId }: HorarioTabProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTabKey>('todos');
  const [deleteId, setDeleteId] = useState<{
    id: number;
    type: BlockType;
  } | null>(null);
  const [recurrenteModal, setRecurrenteModal] = useState<{
    isOpen: boolean;
    initialData?: AvailabilityBlock;
  }>({ isOpen: false });
  const [excepcionModal, setExcepcionModal] = useState<{
    isOpen: boolean;
    initialData?: Unavailability;
  }>({ isOpen: false });

  const {
    data: availability,
    isLoading: loadingAvail,
    isError: errorAvail,
  } = useDoctorAvailabilityQuery(doctorId);
  const {
    data: unavailability,
    isLoading: loadingUnavail,
    isError: errorUnavail,
  } = useDoctorUnavailabilityQuery({ doctorId });

  const deleteAvailMutation = useDoctorAvailabilityDeleteMutation();
  const deleteUnavailMutation = useDoctorUnavailabilityDeleteMutation();

  const isLoading = loadingAvail || loadingUnavail;
  const isError = errorAvail || errorUnavail;

  const allBlocks: UnifiedBlock[] = [
    ...(availability?.map((b) => ({
      id: b.id ?? 0,
      startTime: b.startTime,
      endTime: b.endTime,
      slotDuration: b.slotDuration,
      maxPatientsPerSlot: b.maxPatientsPerSlot,
      isRecurring: b.isRecurring,
      dayOfWeek: b.dayOfWeek,
      specificDate: b.specificDate,
      type: 'recurrente' as BlockType,
    })) ?? []),
    ...(unavailability?.map((u) => ({
      id: u.id,
      startTime: u.startTime,
      endTime: u.endTime,
      isRecurring: false,
      specificDate: u.startTime,
      reason: u.reason,
      type: 'excepcion' as BlockType,
    })) ?? []),
  ];

  const filteredBlocks = allBlocks.filter((block) => {
    if (activeFilter === 'recurrentes') return block.type === 'recurrente';
    if (activeFilter === 'excepciones') return block.type === 'excepcion';
    return true;
  });

  const rows: RowData[] = filteredBlocks.map((block) => ({
    ...block,
    day:
      block.type === 'recurrente'
        ? ([
            'Domingo',
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado',
          ][block.dayOfWeek ?? 0] ?? '—')
        : new Date(block.specificDate ?? '').toLocaleDateString('es-ES', {
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
  }));

  const handleDeleteRequest = (block: UnifiedBlock) => {
    setDeleteId({ id: block.id, type: block.type });
  };

  const handleCancelDelete = () => setDeleteId(null);

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    const toastId = showLoading('Eliminando horario…', {
      description: 'Procesando...',
    });

    try {
      if (deleteId.type === 'recurrente') {
        await deleteAvailMutation.mutateAsync({ doctorId, id: deleteId.id });
      } else {
        await deleteUnavailMutation.mutateAsync({ doctorId, id: deleteId.id });
      }
      showSuccess('Horario eliminado', {
        description: 'El bloque se eliminó correctamente',
        id: toastId,
      });
      setDeleteId(null);
    } catch (error) {
      showApiError(error, { id: toastId });
    }
  };

  const openCreateModal = (mode: 'recurrente' | 'excepcion') => {
    if (mode === 'recurrente') {
      setRecurrenteModal({ isOpen: true, initialData: undefined });
    } else {
      setExcepcionModal({ isOpen: true, initialData: undefined });
    }
  };

  const openEditModal = (block: UnifiedBlock) => {
    if (block.type === 'recurrente') {
      const recurrenteData: AvailabilityBlock = {
        id: block.id,
        startTime: block.startTime,
        endTime: block.endTime,
        slotDuration: block.slotDuration ?? 30,
        maxPatientsPerSlot: block.maxPatientsPerSlot ?? 1,
        isRecurring: block.isRecurring,
        dayOfWeek: block.dayOfWeek ?? 1,
        specificDate: block.specificDate ?? null,
      };
      setRecurrenteModal({ isOpen: true, initialData: recurrenteData });
    } else {
      const excepcionData: Unavailability = {
        id: block.id,
        startTime: block.startTime,
        endTime: block.endTime,
        reason: block.reason ?? '',
      };
      setExcepcionModal({ isOpen: true, initialData: excepcionData });
    }
  };

  const handleRecurrenteModalClose = () =>
    setRecurrenteModal({ isOpen: false });

  const handleExcepcionModalClose = () =>
    setExcepcionModal({ isOpen: false });

  const handleModalSuccess = () => {
    handleRecurrenteModalClose();
    handleExcepcionModalClose();
  };

  const formatTime = (time: string) => time.slice(0, 5);

  const columns = [
    {
      key: 'day' as keyof RowData,
      header: activeFilter === 'excepciones' ? 'Fecha' : 'Día',
    },
    {
      key: 'startTime' as keyof RowData,
      header: 'Hora Inicio',
      render: (row: RowData) => formatTime(row.startTime),
    },
    {
      key: 'endTime' as keyof RowData,
      header: 'Hora Fin',
      render: (row: RowData) => formatTime(row.endTime),
    },
    {
      key: 'slotDuration' as keyof RowData,
      header: 'Duración',
      render: (row: RowData) =>
        row.slotDuration ? `${row.slotDuration} min` : '—',
    },
    {
      key: 'maxPatientsPerSlot' as keyof RowData,
      header: 'Máx. Pacientes',
      render: (row: RowData) => row.maxPatientsPerSlot?.toString() ?? '—',
    },
    {
      key: 'type' as keyof RowData,
      header: 'Tipo',
      render: (row: RowData) => (
        <Badge
          variant={row.type === 'recurrente' ? 'info' : 'warning'}
          className="gap-1"
        >
          {row.type === 'recurrente' ? (
            <CalendarDays className="h-3 w-3" />
          ) : (
            <AlertTriangle className="h-3 w-3" />
          )}
          {row.type === 'recurrente' ? 'Recurrente' : 'Excepción'}
        </Badge>
      ),
    },
    {
      key: 'reason' as keyof RowData,
      header: 'Motivo',
      render: (row: RowData) => row.reason ?? '—',
    },
    {
      key: 'actions' as keyof RowData,
      header: 'Acciones',
      render: (row: RowData) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            title="Editar"
            onClick={() => openEditModal(row)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            color="error"
            title="Eliminar"
            onClick={() => handleDeleteRequest(row)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="rounded-xl bg-bg-surface border border-border-default shadow-sm p-8 mt-6 flex items-center justify-center">
        <svg
          className="h-8 w-8 animate-spin text-primary"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeDasharray="30 70"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <span className="sr-only">Cargando horario...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-bg-surface border border-border-default shadow-sm p-6 mt-6 text-center">
        <AlertTriangle
          className="h-12 w-12 text-danger mx-auto mb-3"
          aria-hidden="true"
        />
        <p className="text-body-lg font-medium text-text-primary">
          Error al cargar el horario
        </p>
        <p className="text-body-sm text-text-muted mt-1">
          No se pudo obtener la información del doctor
        </p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Reintentar
        </Button>
      </div>
    );
  }

  const filterTabs: { key: FilterTabKey; label: string }[] = [
    { key: 'todos', label: `Todos (${allBlocks.length})` },
    {
      key: 'recurrentes',
      label: `Recurrentes (${allBlocks.filter((b) => b.type === 'recurrente').length})`,
    },
    {
      key: 'excepciones',
      label: `Excepciones (${allBlocks.filter((b) => b.type === 'excepcion').length})`,
    },
  ];

  return (
    <section className="mt-6">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-bg-surface-elevated p-2 text-primary shrink-0">
            <CalendarClock className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-headline-md font-semibold text-text-primary">
              Horario del Doctor
            </h2>
            <p className="text-body-sm text-text-muted">
              Visualización unificada de bloques recurrentes y excepciones
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link to={`/doctors/${doctorId}/availability/edit`}>
            <Button variant="outline" size="sm">
              <CalendarDays className="h-4 w-4 mr-2" aria-hidden="true" />
              Editar plantilla semanal
            </Button>
          </Link>
          <Button
            variant="solid"
            size="sm"
            onClick={() => openCreateModal('recurrente')}
          >
            <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
            Agregar recurrente
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openCreateModal('excepcion')}
          >
            <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
            Agregar excepción
          </Button>
        </div>
      </div>

      <NavTabs
        label="Filtros"
        tabs={filterTabs}
        activeTab={activeFilter}
        onTabChange={setActiveFilter}
      />

      <Table<RowData>
        columns={columns}
        rows={rows}
        total={rows.length}
        page={1}
        pageSize={rows.length}
        onPageChange={() => {}}
        rowKey={(row) => `${row.type}-${row.id}`}
        isLoading={false}
        emptyState={
          <div className="text-center py-8">
            <CalendarClock
              className="h-12 w-12 mx-auto text-text-muted/50 mb-3"
              aria-hidden="true"
            />
            <p className="text-body-lg font-medium text-text-muted">
              {activeFilter === 'recurrentes'
                ? 'No hay bloques recurrentes configurados'
                : activeFilter === 'excepciones'
                  ? 'No hay excepciones registradas'
                  : 'No hay horarios configurados'}
            </p>
            <p className="text-body-sm text-text-muted mt-1">
              {activeFilter === 'recurrentes'
                ? 'Use "Agregar recurrente" o "Editar plantilla semanal"'
                : activeFilter === 'excepciones'
                  ? 'Use "Agregar excepción"'
                  : 'Comience agregando un bloque o editando la plantilla semanal'}
            </p>
          </div>
        }
      />

      <Modal
        open={deleteId !== null}
        onOpenChange={(open) => !open && handleCancelDelete()}
        title="Eliminar bloque de horario"
        description={
          deleteId &&
          `¿Deseas eliminar este ${deleteId.type === 'recurrente' ? 'bloque recurrente' : 'excepción'}? Esta acción no se puede deshacer.`
        }
        icon={
          <span className="bg-error/10 p-2 rounded-full text-error">
            <Trash2 className="h-5 w-5" aria-hidden="true" />
          </span>
        }
        footer={
          <>
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancelDelete}
              disabled={
                deleteAvailMutation.isPending || deleteUnavailMutation.isPending
              }
            >
              Cancelar
            </Button>
            <Button
              type="button"
              color="error"
              loading={
                deleteAvailMutation.isPending || deleteUnavailMutation.isPending
              }
              onClick={handleConfirmDelete}
            >
              Eliminar
            </Button>
          </>
        }
      />

      <RecurrenteModal
        isOpen={recurrenteModal.isOpen}
        onClose={handleRecurrenteModalClose}
        doctorId={doctorId}
        initialData={recurrenteModal.initialData}
        onSuccess={handleModalSuccess}
      />
      <ExcepcionModal
        isOpen={excepcionModal.isOpen}
        onClose={handleExcepcionModalClose}
        doctorId={doctorId}
        initialData={excepcionModal.initialData}
        onSuccess={handleModalSuccess}
      />
    </section>
  );
}
