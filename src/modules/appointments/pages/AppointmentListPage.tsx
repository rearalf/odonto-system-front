import { Link } from 'react-router-dom';
import { Calendar, CalendarPlus, Filter, Search, Trash2 } from 'lucide-react';

import {
  Breadcrumbs,
  Button,
  InputField,
  Modal,
  Table,
  SearchSelect,
  MultiSelectField,
} from '@/shared/components/ui';
import { buildAppointmentListColumns } from '@/modules/appointments/constants/appointmentListColumns';
import useAppointmentListPage from '@/modules/appointments/hooks/useAppointmentListPage';
import useAppointmentListFilters from '@/modules/appointments/hooks/useAppointmentListFilters';

export default function AppointmentListPage() {
  const {
    appointments,
    total,
    isLoading,
    isFetching,
    page,
    perPage,
    search,
    searchInput,
    doctorId,
    from,
    to,
    status,
    sortBy,
    onPageChange,
    onPerPageChange,
    setSearchInput,
    setDoctorId,
    setDateRange,
    setStatus,
    setSort,
    handleClearFilters,
    hasActiveFilters,
    selectedAppointment,
    isDeleteModalOpen,
    isDeleting,
    deletingId,
    requestDelete,
    cancelDelete,
    handleConfirmDelete,
  } = useAppointmentListPage();

  const { doctorOptions, statusOptions, sortByOptions } =
    useAppointmentListFilters();

  const emptyState = search ? (
    <div className="text-center py-8">
      <p className="text-body-md text-text-muted">
        No se encontraron citas para &ldquo;{search}&rdquo;.
      </p>
      <button
        type="button"
        onClick={handleClearFilters}
        className="mt-4 text-label-lg font-medium text-primary hover:text-primary-hover"
      >
        Limpiar búsqueda
      </button>
    </div>
  ) : (
    <div className="text-center py-8">
      <p className="text-body-md text-text-muted">
        No hay citas registradas aún.
      </p>
      <Link
        to="/appointments/new"
        className="inline-block mt-4 text-label-lg font-medium text-primary hover:text-primary-hover"
      >
        Crear primera cita →
      </Link>
    </div>
  );

  return (
    <>
      <Breadcrumbs />

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mt-4 text-headline-lg font-bold text-text-primary">
            Citas
          </h1>
          <p className="mt-1 text-body-md text-text-muted">
            Gestión de citas programadas y en espera
          </p>
        </div>
        <Link
          to="/appointments/new"
          className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 text-label-lg font-medium text-text-inverse bg-primary rounded-lg hover:bg-primary-hover sm:w-auto"
        >
          <CalendarPlus className="w-4 h-4" />
          Nueva cita
        </Link>
      </section>

      <section className="mt-6 rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm sm:p-8">
        <div className="mb-4 flex items-center gap-4">
          <div className="rounded-lg bg-bg-surface-elevated p-2 text-primary shrink-0">
            <Filter aria-hidden="true" size={24} />
          </div>
          <div>
            <h2 className="text-headline-md font-semibold text-text-primary">
              Filtros
            </h2>
            <p className="text-body-md text-text-muted">
              Busque y filtre citas por paciente, doctor, fecha y estado.
            </p>
          </div>
        </div>
        <hr className="mb-4 border-border-strong" />

        <form className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
          <div className="flex-1 w-full">
            <InputField
              id="buscar-cita"
              label="Buscar paciente"
              leftIcon={Search}
              placeholder="Nombre del paciente..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <div>
            <SearchSelect
              id="filtro-doctor"
              label="Doctor"
              placeholder="Todos los doctores"
              options={doctorOptions}
              value={doctorId}
              onSelect={(option) =>
                setDoctorId(option?.id as number | undefined)
              }
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <InputField
                id="filtro-desde"
                label="Desde"
                type="date"
                leftIcon={Calendar}
                placeholder="YYYY-MM-DD"
                value={from ?? ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setDateRange(val || undefined, to);
                }}
              />
            </div>
            <div className="flex-1">
              <InputField
                id="filtro-hasta"
                label="Hasta"
                type="date"
                leftIcon={Calendar}
                placeholder="YYYY-MM-DD"
                value={to ?? ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setDateRange(from, val || undefined);
                }}
              />
            </div>
          </div>

          <div>
            <MultiSelectField
              id="filtro-estado"
              label="Estado"
              placeholder="Todos los estados"
              options={statusOptions}
              value={status as string[]}
              onChange={(value) =>
                setStatus(value as ('scheduled' | 'waiting')[])
              }
            />
          </div>

          <div>
            <SearchSelect
              id="filtro-ordenar"
              label="Ordenar por"
              options={sortByOptions}
              value={sortBy}
              onSelect={(option) =>
                setSort(option?.data as 'startTime' | 'createdAt' | 'reason')
              }
            />
          </div>

          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-border-strong">
              <span className="text-body-sm text-text-muted">
                Filtros activos
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
              >
                Limpiar todo
              </Button>
            </div>
          )}

          <div className="flex gap-3 flex-wrap justify-end pt-2">
            <Button type="button" variant="ghost" onClick={handleClearFilters}>
              Limpiar filtros
            </Button>
          </div>
        </form>
      </section>

      <div className="mt-6">
        <Table
          columns={buildAppointmentListColumns({
            onDelete: requestDelete,
            deletingId,
          })}
          rows={appointments}
          total={total}
          page={page}
          pageSize={perPage}
          onPageChange={onPageChange}
          rowKey={(appointment) => appointment.id}
          isLoading={isLoading || isFetching}
          emptyState={emptyState}
          pageSizeOptions={[10, 20, 50]}
          onPageSizeChange={onPerPageChange}
        />
      </div>

      <Modal
        open={isDeleteModalOpen}
        onOpenChange={(open) => !open && cancelDelete()}
        title="Eliminar cita"
        description={
          selectedAppointment &&
          `¿Deseas eliminar la cita de ${selectedAppointment.patientFullName} con ${selectedAppointment.doctorFullName} del ${new Intl.DateTimeFormat(
            'es',
            {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            },
          ).format(
            new Date(selectedAppointment.startTime),
          )}? Esta acción no se puede deshacer.`
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
              onClick={cancelDelete}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              color="error"
              loading={isDeleting}
              onClick={handleConfirmDelete}
            >
              Eliminar
            </Button>
          </>
        }
      />
    </>
  );
}
