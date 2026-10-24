import {
  Plus,
  Filter,
  Trash2,
  Loader2,
  CalendarDays,
  CalendarClock,
  AlertTriangle,
} from 'lucide-react';

import { Button, Modal, Table } from '@/shared/components/ui';
import { SelectField, DatePickerField } from '@/shared/components/ui/form';
import CreateAvailabilityModal from '../components/modals/CreateAvailabilityModal';
import useAvailabilityTab from '../hooks/useAvailabilityTab';
import { buildRecurrentesColumns } from '../constants/horarioTabColumns';
import type { RowData } from '../types/Availability';

const AvailabilitySection = ({ doctorId }: { doctorId: number | string }) => {
  const {
    page,
    total,
    sortKey,
    isError,
    pageSize,
    deleteId,
    isLoading,
    sortDirection,
    recurrenteModal,
    recurrentesRows,
    isRecurringFilter,
    dateRange,
    deleteAvailMutation,
    openEditModal,
    handlePlantilla,
    openCreateModal,
    handleReloadPage,
    handleSortChange,
    handlePageChange,
    handleModalSuccess,
    handleFilterChange,
    handleCancelDelete,
    handleDeleteRequest,
    handleConfirmDelete,
    handlePageSizeChange,
    handleRecurrenteModalClose,
  } = useAvailabilityTab(doctorId);

  const recurrentesColumns = buildRecurrentesColumns({
    onEdit: openEditModal,
    onDelete: (row: RowData) => handleDeleteRequest(row.id),
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
          Bloques Recurrentes ({total})
        </h3>

        <div className="flex flex-col gap-6 xl:flex-row xl:justify-between xl:items-center mb-10 xl:mb-4">
          <div className="mb-4 flex flex-col lg:flex-row gap-4 items-center">
            <div className="w-full lg:w-auto">
              <SelectField
                label="Tipo"
                value={
                  isRecurringFilter === undefined
                    ? ''
                    : String(isRecurringFilter)
                }
                defaultValue=""
                onChange={(e) =>
                  handleFilterChange(
                    'isRecurring',
                    e.target.value === ''
                      ? undefined
                      : e.target.value === 'true',
                  )
                }
              >
                <option value="">Todos</option>
                <option value="true">Recurrentes</option>
                <option value="false">Fecha específica</option>
              </SelectField>
            </div>
            <div className="w-full lg:w-64">
              <DatePickerField
                label="Rango de fechas"
                mode="range"
                value={dateRange}
                onChange={(val) => handleFilterChange('dateRange', val)}
                placeholder="DD/MM/YYYY - DD/MM/YYYY"
                dateFormat="DD/MM/YYYY"
              />
            </div>
            <Button
              size="md"
              variant="outline"
              className="w-full lg:w-auto"
              onClick={() => {
                handleFilterChange('isRecurring', undefined);
                handleFilterChange('dateRange', '');
              }}
              icon={<Filter className="h-4 w-4" aria-hidden="true" />}
            >
              Limpiar filtros
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Button
              size="md"
              variant="outline"
              onClick={handlePlantilla}
              className="w-full xl:w-auto"
            >
              <CalendarDays className="h-4 w-4 mr-2" aria-hidden="true" />
              Editar plantilla semanal
            </Button>
            <Button
              size="md"
              variant="solid"
              onClick={openCreateModal}
              className="w-full xl:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
              Agregar recurrente
            </Button>
          </div>
        </div>

        <Table
          columns={recurrentesColumns}
          rows={recurrentesRows}
          total={total}
          page={page}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
          rowKey={(row) => `recurrente-${row.id}`}
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
