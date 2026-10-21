import {
  AlertTriangle,
  CalendarClock,
  Loader2,
  Plus,
  Trash2,
} from 'lucide-react';

import { Button, Modal, Table } from '@/shared/components/ui';
import useUnavailabilityTab from '../hooks/useUnavailabilityTab';
import { createUnavailabilityTableColumns } from '../constants/horarioTabColumns';
import {
  UnavailabilityModalInfo,
  CreateUnavailabilityModal,
} from '../components';

const UnavailabilitySection = ({ doctorId }: { doctorId: number | string }) => {
  const {
    deleteId,
    unavailabilityModal,
    viewModal,
    isLoading,
    isError,
    unavailabilityRowData,
    deleteUnavailMutation,
    openCreateModal,
    openEditModal,
    handleReloadPage,
    handleModalSuccess,
    handleCancelDelete,
    handleConfirmDelete,
    handleCloseUnavailabilityModal,
    handleView,
    handleDelete,
    handleCloseViewModal,
  } = useUnavailabilityTab(doctorId);

  const excepcionesColumns = createUnavailabilityTableColumns({
    onView: handleView,
    onDelete: handleDelete,
    onEdit: openEditModal,
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
            Ausencias ({unavailabilityRowData.length})
          </h3>
          <Button
            variant="solid"
            size="sm"
            onClick={openCreateModal}
            icon={<Plus className="h-4 w-4 mr-2" aria-hidden="true" />}
          >
            Agregar ausencia
          </Button>
        </div>
        <Table
          columns={excepcionesColumns}
          rows={unavailabilityRowData}
          total={unavailabilityRowData.length}
          page={1}
          pageSize={unavailabilityRowData.length}
          onPageChange={() => {}}
          rowKey={(row) => `excepcion-${row.id}`}
          isLoading={false}
          emptyState={
            <div className="text-center py-8">
              <CalendarClock
                className="h-12 w-12 mx-auto text-text-muted/50 mb-3"
                aria-hidden="true"
              />
              <p className="text-body-lg font-medium text-text-muted">
                No hay ausencias registradas
              </p>
              <p className="text-body-sm text-text-muted mt-1">
                Use "Agregar ausencia"
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
          '¿Deseas eliminar este excepción? Esta acción no se puede deshacer.'
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
              disabled={deleteUnavailMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              color="error"
              loading={deleteUnavailMutation.isPending}
              onClick={handleConfirmDelete}
            >
              Eliminar
            </Button>
          </>
        }
      />

      <CreateUnavailabilityModal
        isOpen={unavailabilityModal.isOpen}
        onClose={handleCloseUnavailabilityModal}
        doctorId={doctorId}
        initialData={unavailabilityModal.initialData}
        onSuccess={handleModalSuccess}
      />

      <UnavailabilityModalInfo
        data={viewModal.initialData ?? null}
        isOpen={viewModal.isOpen}
        onClose={handleCloseViewModal}
      />
    </>
  );
};

export default UnavailabilitySection;
