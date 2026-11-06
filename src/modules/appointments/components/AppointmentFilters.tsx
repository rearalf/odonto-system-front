import type { ReactNode } from 'react';
import { Filter, Search, Calendar } from 'lucide-react';
import {
  Button,
  InputField,
  DatePickerField,
  SearchSelect,
  MultiSelectField,
} from '@/shared/components/ui';
import type { SearchOption } from '@/shared/components/ui/form/SearchSelect/SearchSelect.types';
import type { DoctorListItem } from '@/modules/doctors/types/Doctor';

interface AppointmentFiltersProps {
  searchInput: string | undefined;
  setSearchInput: (value: string) => void;
  doctorId: number | undefined;
  setDoctorId: (id: number | undefined) => void;
  from: string | undefined;
  to: string | undefined;
  setDateRange: (from: string | undefined, to: string | undefined) => void;
  status: string[] | undefined;
  setStatus: (status: string[]) => void;
  sortBy: string | undefined;
  setSortBy: (
    newSortBy: 'startTime' | 'createdAt' | 'reason' | undefined,
  ) => void;
  sortOrder: string | undefined;
  setSortOrder: (newSortOrder: 'ASC' | 'DESC' | undefined) => void;
  doctorOptions: SearchOption<DoctorListItem>[];
  statusOptions: SearchOption<string>[];
  sortByOptions: SearchOption<string>[];
  sortOrderOptions: SearchOption<string>[];
  renderOption: (option: SearchOption<DoctorListItem>) => ReactNode;
  hasActiveFilters: string | number | boolean;
  handleClearFilters: () => void;
}

export function AppointmentFilters({
  searchInput,
  setSearchInput,
  doctorId,
  setDoctorId,
  from,
  to,
  setDateRange,
  status,
  setStatus,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  doctorOptions,
  statusOptions,
  sortByOptions,
  sortOrderOptions,
  renderOption,
  hasActiveFilters,
  handleClearFilters,
}: AppointmentFiltersProps) {
  return (
    <section className="mt-6 rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm sm:p-8">
      {/* Cabecera con botón de limpiar filtros integrado */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-bg-surface-elevated text-primary">
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

        {hasActiveFilters && (
          <div className="shrink-0">
            <Button
              type="button"
              variant="solid"
              color="primary"
              onClick={handleClearFilters}
              className="w-full sm:w-auto"
            >
              Limpiar todo
            </Button>
          </div>
        )}
      </div>

      <hr className="mb-6 border-border-strong" />

      <form className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-2">
          <InputField
            id="buscar-cita"
            label="Buscar paciente"
            leftIcon={Search}
            placeholder="Nombre del paciente..."
            value={searchInput ?? ''}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <SearchSelect
            id="filtro-doctor"
            label="Doctor"
            placeholder="Todos los doctores"
            options={doctorOptions}
            value={doctorId}
            renderOption={renderOption}
            onSelect={(option) => setDoctorId(option?.id as number | undefined)}
          />
        </div>

        <div>
          <DatePickerField
            id="filtro-desde"
            label="Citas que empiezan desde"
            leftIcon={Calendar}
            placeholder="DD/MM/YYYY"
            value={from ?? ''}
            onChange={(val) => setDateRange(val || undefined, to)}
            dateFormat="DD/MM/YYYY"
          />
        </div>
        <div>
          <DatePickerField
            id="filtro-hasta"
            label="Citas que terminan hasta"
            leftIcon={Calendar}
            placeholder="DD/MM/YYYY"
            value={to ?? ''}
            onChange={(val) => setDateRange(from, val || undefined)}
            dateFormat="YYYY-MM-DD"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <MultiSelectField
            id="filtro-estado"
            label="Estado"
            placeholder="Todos los estados"
            options={statusOptions.map((option) => ({
              label: option.label,
              value: option.data,
            }))}
            value={status ?? []}
            onChange={(value) => setStatus(value as string[])}
          />
        </div>

        <div>
          <SearchSelect
            id="filtro-ordenar"
            label="Ordenar por"
            options={sortByOptions}
            value={sortBy ?? ''}
            onSelect={(option) =>
              setSortBy(option?.data as 'startTime' | 'createdAt' | 'reason')
            }
          />
        </div>
        <div>
          <SearchSelect
            id="filtro-orden-direccion"
            label="Dirección"
            options={sortOrderOptions}
            value={sortOrder ?? ''}
            onSelect={(option) => setSortOrder(option?.data as 'ASC' | 'DESC')}
          />
        </div>
      </form>
    </section>
  );
}
