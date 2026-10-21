import {
  Plus,
  Loader2,
  Trash2,
  CalendarDays,
  CalendarClock,
  AlertTriangle,
} from 'lucide-react';

import { Button, Modal, Table } from '@/shared/components/ui';
import CreateAvailabilityModal from '../components/modals/CreateAvailabilityModal';
import useAvailabilityTab from '../hooks/useAvailabilityTab';
import { Link } from 'react-router-dom';
import { buildRecurrentesColumns } from '../constants/horarioTabColumns';
import type { RowData } from '../types/Availability';

const AvailabilitySection = ({ doctorId }: { doctorId: number | string }) => {
  const {
    deleteId,
    recurrenteModal,
    isLoading,
    isError,
    recurrentesRows,
    deleteAvailMutation,
    handleReloadPage,
    handleDeleteRequest,
    handleCancelDelete,
    handleConfirmDelete,
    openCreateModal,
    openEditModal,
    handleRecurrenteModalClose,
    handleModalSuccess,
  } = useAvailabilityTab(doctorId);

  const handleDelete = (row: RowData) => handleDeleteRequest(row.id);

  const recurrentesColumns = buildRecurrentesColumns({
    onEdit: openEditModal,
    onDelete: handleDelete,
  });

  if (isLoading) {
    return (
      <div className="rounded-xl bg-bg-surface border border-border-default shadow-sm p-8 mt-6 flex flex-col gap-3 items-center justify-center">
        <Loader2
          className="animate-spin stroke-primary h-16 w-16"
          aria-hidden="true"
        />
        <span className="text-text-muted">Cargando horario...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-bg-surface border border-border-default shadow-sm p-6 mt-6 text-center">
        <AlertTriangle className="h-12 w-12 stroke-amber-400 mx-auto mb-3" />
        <h2 className="text-headline-sm font-medium text-text-primary">
          Error al cargar el horario
        </h2>
        <p className="text-body-md text-text-muted mt-1">
          No se pudo obtener la información del doctor
        </p>
        <Button variant="outline" onClick={handleReloadPage} className="mt-4">
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <>
      <section>
        <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-headline-sm font-semibold text-text-primary">
            Bloques Recurrentes ({recurrentesRows.length})
          </h3>
          <div className="flex gap-4">
            <Link to={`/doctors/${doctorId}/availability/edit`}>
              <Button variant="outline" size="sm">
                <CalendarDays className="h-4 w-4 mr-2" aria-hidden="true" />
                Editar plantilla semanal
              </Button>
            </Link>
            <Button variant="solid" size="sm" onClick={openCreateModal}>
              <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
              Agregar recurrente
            </Button>
          </div>
        </div>
        <Table
          columns={recurrentesColumns}
          rows={recurrentesRows}
          total={recurrentesRows.length}
          page={1}
          pageSize={recurrentesRows.length}
          onPageChange={() => {}}
          rowKey={(row) => `recurrente-${row.id}`}
          isLoading={false}
          emptyState={
            <div className="text-center py-8">
              <CalendarClock
                className="h-12 w-12 mx-auto text-text-muted/50 mb-3"
                aria-hidden="true"
              />
              <p className="text-body-lg font-medium text-text-muted">
                No hay bloques recurrentes configurados
              </p>
              <p className="text-body-sm text-text-muted mt-1">
                Use "Agregar recurrente" o "Editar plantilla semanal"
              </p>
            </div>
          }
        />
      </section>

      <Modal
        open={deleteId !== null}
        onOpenChange={(open) => !open && handleCancelDelete()}
        title="Eliminar bloque de horario"
        description={
          deleteId &&
          '¿Deseas eliminar este bloque recurrente? Esta acción no se puede deshacer.'
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
              disabled={deleteAvailMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              color="error"
              loading={deleteAvailMutation.isPending}
              onClick={handleConfirmDelete}
            >
              Eliminar
            </Button>
          </>
        }
      />
      <CreateAvailabilityModal
        isOpen={recurrenteModal.isOpen}
        onClose={handleRecurrenteModalClose}
        doctorId={doctorId}
        initialData={recurrenteModal.initialData}
        onSuccess={handleModalSuccess}
      />
    </>
  );
};

export default AvailabilitySection;
