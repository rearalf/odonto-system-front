import { UserRound, AlertTriangle, CalendarDays, Clock3 } from 'lucide-react';

import {
  Button,
  SearchSelect,
  DatePickerField,
  TimePickerField,
} from '@/shared/components/ui';
import { AppointmentSlotsGrid } from '../AppointmentSlotsGrid';
import useDoctorSearchAndSlots from '../../hooks/CreateAppointmentSections/useDoctorSearchAndSlots';
import type { DoctorListItem } from '@/modules/doctors/types/Doctor';
import type { SearchOption } from '@/shared/components/ui/form/SearchSelect/SearchSelect.types';
import type { ReactNode } from 'react';
import type { SelectDoctorSectionProps } from '@/modules/appointments/types';

const SelectDoctorSection = (props: SelectDoctorSectionProps) => {
  const {
    slot,
    date,
    options,
    endTime,
    duration,
    isLoading,
    startTime,
    slotsQuery,
    selectedDoctor,
    setSearch,
    onDateChange,
    onSlotSelect,
    onDurationChange,
    onStartTimeChange,
    handleDoctorSelect,
  } = useDoctorSearchAndSlots(props);

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

  return (
    <section className="rounded-2xl border border-border-default bg-bg-surface p-6 shadow-sm sm:p-8">
      <div className="mb-5 flex items-start gap-3">
        <span className="rounded-xl bg-primary/10 p-3 text-primary">
          <CalendarDays className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-headline-sm font-semibold text-text-primary">
            Asignación y horario
          </h2>
          <p className="text-body-sm text-text-muted">
            Elige el profesional y define el momento de atención.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <SearchSelect<DoctorListItem>
          id="appointment-doctor"
          label="Doctor"
          required
          leftIcon={UserRound}
          placeholder="Buscar doctor..."
          options={options}
          value={props.doctorId}
          onSelect={handleDoctorSelect}
          error={props.doctorError}
          isLoading={isLoading}
          onSearchChange={setSearch}
          renderOption={renderOption}
          emptyMessage="No se encontraron doctores"
          loadingMessage="Buscando doctores…"
        />
        {props.isWalkIn ? (
          <DatePickerField
            id="appointment-date"
            label="Fecha de atención"
            required
            value={date}
            disabled
            onChange={onDateChange}
          />
        ) : (
          <DatePickerField
            id="appointment-date"
            label="Fecha de atención"
            required
            minDate={new Date()}
            value={date}
            onChange={onDateChange}
            error={props.dateError}
          />
        )}
      </div>

      {props.isWalkIn ? (
        <div className="mt-5 space-y-5">
          <div className="rounded-xl border border-amber-300/60 bg-amber-50 p-4 text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
            <div className="flex items-start gap-3">
              <AlertTriangle
                className="mt-0.5 h-5 w-5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold">Atención Walk-in</p>
                <p className="mt-1 text-body-sm">
                  Esta cita se insertará como sobrecupo y quedará en estado de
                  espera.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-[1fr_auto]">
            <TimePickerField
              label="Hora de inicio"
              id="appointment-start-time"
              required
              value={startTime}
              onChange={onStartTimeChange}
              showSeconds={false}
              use12Hour={false}
              stepSeconds={900}
            />
            <div>
              <p className="mb-1.5 text-label-lg font-semibold text-text-primary">
                Duración
              </p>
              <div className="flex gap-2">
                {[15, 30, 45].map((minutes) => (
                  <Button
                    key={minutes}
                    type="button"
                    size="sm"
                    variant={duration === minutes ? 'solid' : 'outline'}
                    onClick={() => onDurationChange(minutes)}
                  >
                    {minutes} min
                  </Button>
                ))}
              </div>
              <p className="mt-2 text-body-sm text-text-muted">
                Finaliza a las {endTime || '—'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5">
          {!props.doctorId || !date ? (
            <div className="rounded-xl border border-dashed border-border-strong p-5 text-body-sm text-text-muted">
              Selecciona doctor y fecha para consultar horarios.
            </div>
          ) : slotsQuery.isFetching ? (
            <div className="rounded-xl border border-dashed border-border-strong p-5 text-body-sm text-text-muted">
              Consultando disponibilidad…
            </div>
          ) : (
            <AppointmentSlotsGrid
              slots={slotsQuery.data?.slots ?? []}
              selected={slot?.startTime}
              onSelect={onSlotSelect}
              error={props.slotError}
            />
          )}
        </div>
      )}

      {selectedDoctor && (
        <p className="mt-4 text-body-sm text-text-muted">
          <Clock3 className="mr-1 inline h-4 w-4" />
          Atendiendo con {selectedDoctor.fullName}
        </p>
      )}
    </section>
  );
};

export default SelectDoctorSection;
