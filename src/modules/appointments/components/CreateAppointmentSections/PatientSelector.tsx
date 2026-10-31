import { Search, UserPlus, UserRound } from 'lucide-react';

import { Button } from '@/shared/components/ui';
import SearchSelect from '@/shared/components/ui/form/SearchSelect';
import type { PatientListItem } from '@/modules/patients/types/PatientList';
import { PatientCard } from '../../components/PatientCard';
import CreatePatientModal from '../../components/modals/CreatePatientModal';
import type { PatientSelectorProps } from '@/modules/appointments/types';
import usePatientSearch from '../../hooks/CreateAppointmentSections/usePatientSearch';

const PatientSelector = ({
  patientId,
  patientMode,
  cardData,
  error,
  isModalOpen,
  onSelectExisting,
  onClearPatient,
  onEditPatient,
  onOpenNewPatientModal,
  onClosePatientModal,
  onSaveNewPatient,
  control,
  errors,
}: PatientSelectorProps) => {
  const { query, options, setSearch } = usePatientSearch();

  return (
    <>
      <section className="rounded-2xl border border-border-default bg-bg-surface p-6 shadow-sm sm:p-8">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="rounded-xl bg-primary/10 p-3 text-primary">
              <UserRound className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-headline-sm font-semibold text-text-primary">
                Paciente
              </h2>
              <p className="text-body-sm text-text-muted">
                Busca un expediente existente o abre uno nuevo.
              </p>
            </div>
          </div>
          {!cardData && !patientId && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={<UserPlus className="h-4 w-4" />}
              onClick={onOpenNewPatientModal}
            >
              Nuevo paciente
            </Button>
          )}
        </div>

        {!cardData && patientMode === 'search' && (
          <SearchSelect<PatientListItem>
            required
            id="patient-search"
            label="Paciente"
            leftIcon={Search}
            placeholder="Buscar por nombre"
            error={error}
            value={patientId}
            options={options}
            isLoading={query.isFetching}
            loadingMessage="Buscando pacientes…"
            emptyMessage="No se encontraron pacientes."
            onSearchChange={setSearch}
            help="Escriba para buscar el paciente"
            onSelect={(option) => {
              if (option) {
                onSelectExisting(option.data);
              } else {
                if (patientId != null)
                  onSelectExisting({ id: 0 } as PatientListItem);
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
        )}

        {cardData && (
          <PatientCard
            patient={cardData}
            onClear={onClearPatient}
            onEdit={cardData.source === 'new' ? onEditPatient : undefined}
          />
        )}
      </section>

      <CreatePatientModal
        isOpen={isModalOpen}
        onClose={onClosePatientModal}
        onSavePatient={onSaveNewPatient}
        control={control}
        errors={errors}
      />
    </>
  );
};

export default PatientSelector;