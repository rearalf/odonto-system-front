import { Controller } from 'react-hook-form';
import {
  TriangleAlert,
  ClipboardList,
  CheckCircle2,
  Stethoscope,
  Briefcase,
  Activity,
  Calendar,
  IdCard,
  Phone,
  Users,
  Home,
  User,
  Bell,
} from 'lucide-react';

import {
  MaskedInputField,
  TextAreaField,
  SelectField,
  Breadcrumbs,
  InputField,
  DateField,
  Switch,
  Button,
  Badge,
} from '@/shared/components/ui';
import { ToothIcon } from '@/shared/components/ui/Icons/ToothIcon';

import { PhotoUploadCard } from '@/modules/patients/components/PhotoUploadCard';
import { usePatientCreate } from '@/modules/patients/hooks/usePatientCreate';
import { GenderType } from '@/modules/patients/enums/GenderType';

function PatientCreatePage() {
  const {
    register,
    control,
    errors,
    isSubmitting,
    onSubmit,
    setBirthDate,
    setCompleteOdontogram,
    handleCancel,
    setFoto,
    sistemas,
    birthDate,
    completeOdontogram,
    foto,
    age,
    maxBirthDate,
  } = usePatientCreate();

  return (
    <div>
      <Breadcrumbs />

      <h1 className="mt-4 text-headline-lg font-bold text-text-primary">
        Nuevo paciente
      </h1>
      <p className="mt-1 text-body-md text-text-muted">
        Complete la información requerida del paciente. Los campos marcados con
        (<span className="text-orange-400">*</span>) son obligatorios para la
        apertura oficial del expediente clínico y la asignación del número de
        historia.
      </p>

      <form onSubmit={onSubmit} noValidate>
        <section className="mt-6 rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex items-center gap-4 flex-wrap justify-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-bg-surface-elevated p-2 text-primary shrink-0">
                <IdCard aria-hidden="true" size={32} />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <h2 className="text-headline-md font-semibold text-text-primary">
                  1. Información Personal del Paciente
                </h2>
                <p className="text-body-md text-text-muted">
                  Filiación legal requerida según normativa sanitaria vigente.
                </p>
              </div>
            </div>
            <Badge variant="primary" size="md" className="shrink-0">
              OBLIGATORIO
            </Badge>
          </div>
          <hr className="mb-4 border-border-strong" />
          <PhotoUploadCard file={foto} onFileChange={setFoto} />
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <InputField
              id="primer-nombre"
              label="Primer Nombre"
              required
              leftIcon={User}
              placeholder="Ej. Carlos"
              error={errors.firstName?.message}
              {...register('firstName')}
            />
            <InputField
              id="segundo-nombre"
              label="Segundo Nombre"
              optional
              leftIcon={User}
              placeholder="Ej. Eduardo"
              {...register('middleName')}
            />
            <InputField
              id="apellidos"
              label="Apellidos Completos"
              required
              leftIcon={Users}
              placeholder="Ej. Gómez Mendoza"
              error={errors.lastName?.message}
              {...register('lastName')}
            />

            <DateField
              id="fecha-nacimiento"
              label="Fecha de Nacimiento"
              required
              leftIcon={Calendar}
              help="Formato: DD/MM/AAAA"
              max={maxBirthDate}
              value={birthDate}
              onChange={setBirthDate}
              badge={age !== null ? `${age} años` : undefined}
              error={errors.birthDate?.message}
            />
            <SelectField
              id="genero"
              label="Género Biológico / Legal"
              required
              leftIcon={Users}
              error={errors.gender?.message}
              defaultValue=""
              {...register('gender')}
            >
              <option value="" disabled>
                Seleccione una opción
              </option>
              <option value={GenderType.MALE}>Masculino</option>
              <option value={GenderType.FEMALE}>Femenino</option>
              <option value={GenderType.OTHER}>Otro</option>
            </SelectField>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="rounded-lg bg-bg-surface-elevated p-2 text-primary shrink-0">
                <Phone aria-hidden="true" size={32} />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <h2 className="text-headline-md font-semibold text-text-primary">
                  2. Información de Contacto y Residencia
                </h2>
                <p className="text-body-md text-text-muted">
                  Datos de localización telefónica, ocupación profesional y
                  dirección postal.
                </p>
              </div>
            </div>
          </div>
          <hr className="mb-4 border-border-strong" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <MaskedInputField
                  id="telefono"
                  label="Teléfono Celular Primario"
                  required
                  inputMode="tel"
                  prefix="+503"
                  mask="0000 0000"
                  placeholder="#### ####"
                  unmask
                  onAccept={field.onChange}
                  error={errors.phone?.message}
                />
              )}
            />
            <InputField
              id="ocupacion"
              label="Ocupación / Profesión"
              leftIcon={Briefcase}
              placeholder="Ej. Ingeniero de Software"
              {...register('occupation')}
            />
            <div className="md:col-span-2">
              <TextAreaField
                id="direccion"
                label="Dirección Completa de Residencia"
                leftIcon={Home}
                rows={3}
                placeholder="Dirección completa (calle, número, piso, puerta, código postal y ciudad de residencia)..."
                {...register('address')}
              />
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm sm:p-8">
          <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="rounded-lg bg-bg-surface-elevated p-2 shrink-0">
                <ToothIcon className="h-8 w-8 stroke-[1.5] stroke-primary fill-transparent" />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <Badge
                  variant="primary"
                  size="sm"
                  className="w-fit bg-primary/10 border border-primary/40 text-primary uppercase"
                >
                  Apertura clínica
                </Badge>
                <h2 className="text-headline-md font-semibold text-text-primary">
                  4. Evaluación Odontológica Inicial
                </h2>
              </div>
            </div>
            <Badge variant="success" size="md" className="shrink-0">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Odontograma completado
            </Badge>
          </div>
          <p className="text-body-md text-text-muted">
            Indica si el odontograma inicial del paciente ya fue completado
            durante la consulta diagnóstica de valoración de ingreso o si queda
            formalmente en estado de triaje pendiente para el odontólogo
            asignado.
          </p>
          <hr className="my-4 border-border-strong" />
          <div className="mt-4 flex flex-col gap-4 rounded-xl border border-border-default bg-bg-surface-elevated p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="rounded-lg bg-bg-chrome p-2 text-primary shrink-0">
                <ClipboardList aria-hidden="true" size={24} />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <p className="text-body-lg font-semibold text-text-primary">
                  ¿Evaluación odontológica inicial completada?
                  <span className="text-error" aria-hidden="true">
                    *
                  </span>
                </p>
                <p className="text-body-sm text-text-muted">
                  Habilitará el mapa dental primario con código CIE-10 dental y
                  piezas presentes.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-label-lg font-semibold text-text-primary uppercase">
                Sí, completada
              </span>
              <Switch
                checked={completeOdontogram}
                onChange={setCompleteOdontogram}
                aria-label="Evaluación odontológica inicial completada"
              />
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="rounded-lg bg-bg-surface-elevated p-2 text-primary shrink-0">
                <Activity aria-hidden="true" size={32} />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <h2 className="text-headline-md font-semibold text-text-primary">
                  5. Antecedentes Médicos y Factores de Riesgo
                </h2>
                <p className="text-body-md text-text-muted">
                  Historial preexistente, medicamentos y sensibilidad a fármacos
                  anestésicos.
                </p>
              </div>
            </div>
            <Badge variant="error" size="md" className="shrink-0">
              <TriangleAlert className="h-4 w-4" aria-hidden="true" />
              Alertas Críticas
            </Badge>
          </div>
          <hr className="mb-4 border-border-strong" />

          <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-error/20 dark:bg-error/10">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="rounded-lg bg-red-100 p-2 text-error shrink-0 dark:bg-error/20">
                  <Bell aria-hidden="true" size={24} />
                </div>
                <h3 className="text-headline-sm font-semibold text-error">
                  Alergias y Reacciones Adversas Medicamentosas
                </h3>
              </div>
              <Badge variant="error" size="sm" className="shrink-0 uppercase">
                Precaución Quirúrgica
              </Badge>
            </div>
            <TextAreaField
              id="alergias-adversas"
              label="Alergias conocidas"
              rows={3}
              placeholder="Indique alergias conocidas (ej. Penicilina, látex, AINEs, anestésicos locales con vasoconstrictor)..."
              {...register('allergicReactions')}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TextAreaField
              id="antecedentes-medicos"
              label="Antecedentes Médicos y Quirúrgicos Generales"
              rows={4}
              placeholder="Describa cirugías previas, hospitalizaciones, patologías crónicas o antecedentes familiares de interés odontológico..."
              {...register('medicalHistory')}
            />
            <TextAreaField
              id="tratamiento-sistemico"
              label="Tratamiento Sistémico Actual (Farmacología)"
              rows={4}
              placeholder="Medicamentos actuales: anticoagulantes orales, antihipertensivos, bifosfonatos, corticoides, dosis y frecuencia..."
              {...register('currentSystemicTreatment')}
            />
            <TextAreaField
              id="examenes-laboratorio"
              label="Resultados y Exámenes de Laboratorio"
              rows={4}
              placeholder="Hemogramas, tiempos de coagulación (INR), glucemia basal, HbA1c o paneles virales recientes..."
              {...register('labResults')}
            />
            <TextAreaField
              id="notas-clinicas"
              label="Notas y Observaciones Clínicas Adicionales"
              rows={4}
              placeholder="Hallazgos en mucosa oral, hábitos parafuncionales (bruxismo), hábitos tabáquicos o consideraciones anestésicas..."
              {...register('systemEvaluationNotes')}
            />
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="rounded-lg bg-bg-surface-elevated p-2 text-primary shrink-0">
                <Stethoscope aria-hidden="true" size={32} />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <h2 className="text-headline-md font-semibold text-text-primary">
                  6. Revisión Sistemática de Órganos y Aparatos
                </h2>
                <p className="text-body-md text-text-muted">
                  Indique si el paciente presenta antecedentes, alteraciones o
                  patologías activas por cada sistema anatómico.
                </p>
              </div>
            </div>
          </div>
          <hr className="mb-4 border-border-strong" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sistemas.map((sistema) => {
              const Icono = sistema.icono;
              return (
                <div
                  key={sistema.id}
                  className="flex flex-col gap-3 rounded-xl border border-border-subtle bg-bg-surface-elevated p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-lg bg-sky-50 p-2 text-info shrink-0 dark:bg-primary/15">
                      <Icono className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <Switch
                      checked={sistema.checked}
                      onChange={sistema.toggle}
                      aria-label={`${sistema.nombre} revisado`}
                    />
                  </div>
                  <p className="text-body-md font-semibold text-text-primary">
                    {sistema.nombre}
                  </p>
                  <p className="text-body-sm text-text-muted">
                    Sin problemas registrados
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="flex gap-4 mb-8 mt-6 justify-end">
            <Button variant="destructive" onClick={handleCancel}>
              Descartar
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Guardar paciente
            </Button>
          </div>
      </form>
    </div>
  );
}

export default PatientCreatePage;
