import {
  AlertTriangle,
  CalendarClock,
  Loader2,
  Plus,
  Trash2,
  Filter,
} from 'lucide-react';

import { Button, Modal, Table, DatePickerField } from '@/shared/components/ui';
import useUnavailabilityTab from '../hooks/useUnavailabilityTab';
import { createUnavailabilityTableColumns } from '../constants/horarioTabColumns';
import {
  UnavailabilityModalInfo,
  CreateUnavailabilityModal,
} from '../components';

const UnavailabilitySection = ({ doctorId }: { doctorId: number | string }) => {
  const {
    to,
    from,
    page,
    total,
    isError,
    sortKey,
    pageSize,
    deleteId,
    viewModal,
    isLoading,
    sortDirection,
    unavailabilityModal,
    unavailabilityRowData,
    deleteUnavailMutation,
    handleView,
    handleDelete,
    openEditModal,
    openCreateModal,
    handleSortChange,
    handleReloadPage,
    handlePageChange,
    handleModalSuccess,
    handleCancelDelete,
    handleFilterChange,
    handleDateRangeChange,
    handleConfirmDelete,
    handleCloseViewModal,
    handlePageSizeChange,
    handleCloseUnavailabilityModal,
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
        <h3 className="mb-8 text-headline-md font-semibold text-text-primary text-center md:text-left">
          Ausencias ({total})
        </h3>

        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center mb-10 lg:mb-4">
          <div className="mb-4 flex flex-col lg:flex-row gap-4 items-center">
            <div className="w-full lg:w-auto">
              <DatePickerField
                label="Rango de fechas"
                mode="range"
                dateFormat="YYYY-MM-DD"
                value={from && to ? `${from} - ${to}` : from ? `${from} -` : ''}
                onChange={handleDateRangeChange}
              />
            </div>
            <Button
              size="md"
              variant="outline"
              className="w-full lg:w-auto"
              onClick={() => {
                handleFilterChange('from', '');
                handleFilterChange('to', '');
              }}
              icon={<Filter className="h-4 w-4 mr-2" aria-hidden="true" />}
            >
              Limpiar filtros
            </Button>
          </div>
          <Button
            size="md"
            variant="solid"
            onClick={openCreateModal}
            icon={<Plus className="h-4 w-4 mr-2" aria-hidden="true" />}
          >
            Agregar ausencia
          </Button>
        </div>

        <Table
          columns={excepcionesColumns}
          rows={unavailabilityRowData}
          total={total}
          page={page}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
          rowKey={(row) => `excepcion-${row.id}`}
          isLoading={false}
          pageSizeOptions={[10, 25, 50]}
          onPageSizeChange={handlePageSizeChange}
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
