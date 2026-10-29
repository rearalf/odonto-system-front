import { useState } from 'react';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { Calendar, ChevronDown, Phone, UserRound, Users } from 'lucide-react';

import { SISTEMAS_ANATOMICOS } from '@/modules/patients/constants/SistemasAnatomicos';
import { GenderType } from '@/modules/patients/enums/GenderType';
import {
  Modal,
  Switch,
  Button,
  InputField,
  SelectField,
  TextAreaField,
  DatePickerField,
  MaskedInputField,
} from '@/shared/components/ui';
import type { AppointmentCreateFormValues } from '../../schemas/AppointmentCreateSchema';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSavePatient: () => void;
  control: Control<AppointmentCreateFormValues>;
  errors: FieldErrors<AppointmentCreateFormValues>;
};

const CreatePatientModal = ({
  isOpen,
  onClose,
  onSavePatient,
  control,
  errors,
}: Props) => {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const newErrors = errors.newPatient;

  if (!isOpen) return null;
  return (
    <Modal
      open={isOpen}
      onOpenChange={onClose}
      closeOnBackdrop={false}
      title="Nuevo paciente"
      description="Completa los datos del nuevo expediente."
      size="xxxl"
      footer={
        <div className="flex flex-col gap-4 w-full md:flex-row md:justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="button" onClick={onSavePatient}>
            Guardar
          </Button>
        </div>
      }
    >
      <div className="rounded-xl border border-border-default bg-bg-surface-elevated p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Controller
            name="newPatient.firstName"
            control={control}
            render={({ field }) => (
              <InputField
                id="new-first-name"
                label="Nombres"
                required
                leftIcon={UserRound}
                placeholder="Ej. Ana María"
                error={newErrors?.firstName?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="newPatient.lastName"
            control={control}
            render={({ field }) => (
              <InputField
                id="new-last-name"
                label="Apellidos"
                required
                leftIcon={Users}
                placeholder="Ej. López Pérez"
                error={newErrors?.lastName?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="newPatient.birthDate"
            control={control}
            render={({ field }) => (
              <DatePickerField
                id="new-birth-date"
                label="Fecha de nacimiento"
                required
                leftIcon={Calendar}
                max={new Date().toISOString().slice(0, 10)}
                error={newErrors?.birthDate?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="newPatient.gender"
            control={control}
            render={({ field }) => (
              <SelectField
                id="new-gender"
                label="Género"
                required
                leftIcon={Users}
                error={newErrors?.gender?.message}
                {...field}
                value={field.value ?? ''}
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>
                <option value={GenderType.MALE}>Masculino</option>
                <option value={GenderType.FEMALE}>Femenino</option>
                <option value={GenderType.OTHER}>Otro</option>
              </SelectField>
            )}
          />
          <Controller
            name="newPatient.phone"
            control={control}
            render={({ field }) => (
              <MaskedInputField
                id="new-phone"
                label="Teléfono"
                required
                leftIcon={Phone}
                mask="0000 0000"
                unmask
                value={field.value}
                onAccept={field.onChange}
                error={newErrors?.phone?.message}
              />
            )}
          />
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-border-default bg-bg-surface p-3">
          <div>
            <p className="text-body-md font-semibold text-text-primary">
              Odontograma inicial completado
            </p>
            <p className="text-body-sm text-text-muted">
              Se marca por defecto al abrir un expediente.
            </p>
          </div>
          <Controller
            name="newPatient.completeOdontogram"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onChange={field.onChange}
                aria-label="Odontograma inicial completado"
              />
            )}
          />
        </div>
        <button
          type="button"
          className="mt-4 flex w-full items-center justify-between border-t border-border-default p-4 rounded-xl text-left text-body-md font-semibold text-text-primary bg-bg-surface"
          onClick={() => setExpanded1((value) => !value)}
        >
          Alergias y Reacciones Adversas Medicamentosas
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expanded1 ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
        {expanded1 && (
          <div className="space-y-4 rounded-xl border border-border-default p-4 bg-bg-surface">
            <Controller
              name="newPatient.allergicReactions"
              control={control}
              render={({ field }) => (
                <TextAreaField
                  id="alergias-adversas"
                  label="Alergias conocidas"
                  rows={3}
                  maxLength={500}
                  placeholder="Indique alergias conocidas (ej. Penicilina, látex, AINEs, anestésicos locales con vasoconstrictor)..."
                  error={newErrors?.allergicReactions?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="newPatient.medicalHistory"
              control={control}
              render={({ field }) => (
                <TextAreaField
                  id="new-medical-history"
                  label="Antecedentes médicos y Quirúrgicos Generales"
                  rows={3}
                  maxLength={500}
                  placeholder="Describa cirugías previas, hospitalizaciones, patologías crónicas o antecedentes familiares de interés odontológico..."
                  error={newErrors?.medicalHistory?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="newPatient.currentSystemicTreatment"
              control={control}
              render={({ field }) => (
                <TextAreaField
                  id="tratamiento-sistemico"
                  label="Tratamiento Sistémico Actual (Farmacología)"
                  rows={4}
                  maxLength={1000}
                  placeholder="Medicamentos actuales: anticoagulantes orales, antihipertensivos, bifosfonatos, corticoides, dosis y frecuencia..."
                  error={newErrors?.currentSystemicTreatment?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="newPatient.labResults"
              control={control}
              render={({ field }) => (
                <TextAreaField
                  id="examenes-laboratorio"
                  label="Resultados y Exámenes de Laboratorio"
                  rows={4}
                  maxLength={1000}
                  placeholder="Hemogramas, tiempos de coagulación (INR), glucemia basal, HbA1c o paneles virales recientes..."
                  error={newErrors?.labResults?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="newPatient.systemEvaluationNotes"
              control={control}
              render={({ field }) => (
                <TextAreaField
                  id="notas-clinicas"
                  label="Notas y Observaciones Clínicas Adicionales"
                  rows={4}
                  maxLength={1000}
                  placeholder="Hallazgos en mucosa oral, hábitos parafuncionales (bruxismo), hábitos tabáquicos o consideraciones anestésicas..."
                  error={newErrors?.systemEvaluationNotes?.message}
                  {...field}
                />
              )}
            />
          </div>
        )}

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-between border-t border-border-default p-4 rounded-xl text-left text-body-md font-semibold text-text-primary bg-bg-surface"
          onClick={() => setExpanded2((value) => !value)}
        >
          Revisión Sistemática de Órganos y Aparatos
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expanded2 ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
        {expanded2 && (
          <div className="grid gap-3 sm:grid-cols-2 rounded-xl border border-border-default p-4 bg-bg-surface">
            {SISTEMAS_ANATOMICOS.map((system) => (
              <Controller
                key={system.dtoKey}
                name={`newPatient.${system.dtoKey}`}
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-between rounded-lg border border-border-default bg-bg-surface-elevated p-3">
                    <span className="text-body-sm text-text-primary">
                      {system.nombre}
                    </span>
                    <Switch
                      checked={field.value}
                      onChange={field.onChange}
                      aria-label={`${system.nombre} con alteraciones`}
                    />
                  </div>
                )}
              />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CreatePatientModal;
