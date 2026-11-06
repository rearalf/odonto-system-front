import { Link } from 'react-router-dom';
import { CalendarPlus, Trash2 } from 'lucide-react';

import { Breadcrumbs, Button, Modal, Table } from '@/shared/components/ui';
import {
  sortOrderOptions,
  buildAppointmentListColumns,
} from '@/modules/appointments/constants/appointmentListColumns';
import useAppointmentListPage from '@/modules/appointments/hooks/useAppointmentListPage';
import { AppointmentFilters } from '@/modules/appointments/components/AppointmentFilters';
import type { SearchOption } from '@/shared/components/ui/form/SearchSelect/SearchSelect.types';
import type { DoctorListItem } from '@/modules/doctors/types/Doctor';
import type { ReactNode } from 'react';

function AppointmentListPage() {
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
    sortOrder,
    onPageChange,
    onPerPageChange,
    setSearchInput,
    setDoctorId,
    setDateRange,
    setStatus,
    setSortBy,
    setSortOrder,
    handleClearFilters,
    hasActiveFilters,
    selectedAppointment,
    isDeleteModalOpen,
    isDeleting,
    deletingId,
    requestDelete,
    cancelDelete,
    handleConfirmDelete,
    statuses,
    doctorOptions,
    statusOptions,
    sortByOptions,
  } = useAppointmentListPage();

  const renderOption = (option: SearchOption<DoctorListItem>): ReactNode => (
    <div className="flex flex-col gap-1">
      <span className="font-medium text-text-primary">
        {option.data.fullName}
      </span>
      <span className="text-body-sm text-text-muted">
        {option.data.primarySpecialty}
        {option.data.specialtyCount > 1 &&
          ` +${option.data.specialtyCount - 1} más`}
      </span>
    </div>
  );

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

      <AppointmentFilters
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        doctorId={doctorId}
        setDoctorId={setDoctorId}
        from={from}
        to={to}
        setDateRange={setDateRange}
        status={status}
        setStatus={setStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        doctorOptions={doctorOptions}
        statusOptions={statusOptions}
        sortByOptions={sortByOptions}
        sortOrderOptions={sortOrderOptions}
        renderOption={renderOption}
        hasActiveFilters={hasActiveFilters}
        handleClearFilters={handleClearFilters}
      />

      <div className="mt-6">
        <Table
          columns={buildAppointmentListColumns({
            onDelete: requestDelete,
            deletingId,
            statuses,
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

export default AppointmentListPage;
