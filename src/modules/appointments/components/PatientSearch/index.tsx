import { Search, UserRound } from 'lucide-react';

import SearchSelect from '@/shared/components/ui/form/SearchSelect';
import type { PatientListItem } from '@/modules/patients/types/PatientList';

import type { PatientSearchProps } from '../../types/Appointment';
import usePatientSearch from '../../hooks/usePatientSearch';

const PatientSearch = (props: PatientSearchProps) => {
  const { query, options, setSearch } = usePatientSearch();

  return (
    <SearchSelect<PatientListItem>
      required
      id="patient-search"
      label="Paciente"
      leftIcon={Search}
      placeholder="Buscar por nombre"
      error={props.error}
      value={props.selectedId}
      options={options}
      isLoading={query.isFetching}
      loadingMessage="Buscando pacientes…"
      emptyMessage="No se encontraron pacientes."
      onSearchChange={setSearch}
      help="Escriba para buscar el paciente"
      onSelect={(option) => {
        if (option) {
          props.onSelect(option.data);
        } else {
          if (props.selectedId != null)
            props.onSelect({ id: 0 } as PatientListItem);
        }
      }}
      renderOption={(option) => (
        <div className="flex w-full items-center gap-3">
          <span className="rounded-lg bg-bg-surface-elevated p-2 text-primary">
            <UserRound className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <span className="block text-body-md font-semibold text-text-primary">
              {option.data.fullName}
            </span>
            <span className="block text-body-sm text-text-muted">
              {option.data.phone}
            </span>
          </div>
        </div>
      )}
    />
  );
};

export default PatientSearch;
