import { Link } from 'react-router-dom';
import { Filter, Plus, Search, Trash2 } from 'lucide-react';

import {
  Modal,
  Table,
  Button,
  InputField,
  Breadcrumbs,
} from '@/shared/components/ui';
import useDoctorSearch from '@/modules/doctors/hooks/useDoctorSearch';
import buildDoctorListColumns from '@/modules/doctors/constants/doctorListColumns';

export default function DoctorListPage() {
  const {
    doctors,
    total,
    isLoading,
    page,
    perPage,
    search,
    searchInput,
    isDeleteModalOpen,
    isDeleting,
    deletingId,
    selectedDoctor,
    onPageChange,
    onPerPageChange,
    setSearchInput,
    handleSubmit,
    handleClear,
    cancelDelete,
    requestDelete,
    handleConfirmDelete,
  } = useDoctorSearch();

  const emptyState = search ? (
    <div>
      <p className="text-body-md text-text-muted">
        No se encontraron doctores para &ldquo;{search}&rdquo;.
      </p>
      <button
        type="button"
        onClick={handleClear}
        className="mt-4 text-label-lg font-medium text-primary hover:text-primary-hover"
      >
        Limpiar búsqueda
      </button>
    </div>
  ) : (
    <div>
      <p className="text-body-md text-text-muted">
        No hay doctores registrados aún.
      </p>
      <Link
        to="/doctors/new"
        className="inline-block mt-4 text-label-lg font-medium text-primary hover:text-primary-hover"
      >
        Crear primer doctor →
      </Link>
    </div>
  );

  return (
    <>
      <Breadcrumbs />

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mt-4 text-headline-lg font-bold text-text-primary">
            Doctores
          </h1>
          <p className="mt-1 text-body-md text-text-muted">
            Gestión de doctores registrados
          </p>
        </div>
        <Link
          to="/doctors/new"
          className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 text-label-lg font-medium text-text-inverse bg-primary rounded-lg hover:bg-primary-hover sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Nuevo doctor
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
              Busque y filtre doctores registrados.
            </p>
          </div>
        </div>
        <hr className="mb-4 border-border-strong" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 items-center lg:flex-row lg:items-end justify-center"
        >
          <div className="flex-1 w-full">
            <InputField
              id="buscar-doctor"
              label="Buscar"
              leftIcon={Search}
              placeholder="Nombre..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="flex gap-3 flex-wrap w-full justify-center lg:w-auto">
            <Button
              type="submit"
              className="w-full md:w-auto"
              icon={<Search className="h-4 w-4" />}
            >
              Buscar
            </Button>
            <Button
              type="button"
              className="w-full md:w-auto"
              variant="ghost"
              onClick={handleClear}
            >
              Limpiar filtros
            </Button>
          </div>
        </form>
      </section>

      <div className="mt-6">
        <Table
          columns={buildDoctorListColumns({
            onDelete: requestDelete,
            deletingId,
          })}
          rows={doctors}
          total={total}
          page={page}
          pageSize={perPage}
          onPageChange={onPageChange}
          rowKey={(doctor) => doctor.id}
          isLoading={isLoading}
          emptyState={emptyState}
          pageSizeOptions={[10, 20, 50]}
          onPageSizeChange={onPerPageChange}
        />
      </div>

      <Modal
        open={isDeleteModalOpen}
        onOpenChange={(open) => !open && cancelDelete()}
        title="Eliminar doctor"
        description={
          selectedDoctor &&
          `¿Deseas eliminar a ${selectedDoctor.fullName}? Esta acción no se puede deshacer.`
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
