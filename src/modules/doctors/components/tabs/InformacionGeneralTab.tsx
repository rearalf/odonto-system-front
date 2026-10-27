import {
  Award,
  BadgeCheck,
  GraduationCap,
  LayoutGrid,
  Microscope,
  ShieldCheck,
  Star,
  Stethoscope,
  User,
} from 'lucide-react';
import { Badge } from '@/shared/components/ui';
import type { DoctorDetail } from '../../types/Doctor';

// const STATUS_CHIPS = [
//   {
//     label: 'Programada',
//     dot: 'bg-text-muted',
//     classes: 'bg-bg-surface text-text-primary border-border-subtle',
//   },
//   {
//     label: 'Confirmada',
//     dot: 'bg-primary',
//     classes: 'bg-bg-surface text-primary border-border-subtle font-medium',
//   },
//   {
//     label: 'En Sala de Espera',
//     dot: 'bg-info',
//     classes: 'bg-bg-surface text-text-primary border-border-subtle',
//   },
//   {
//     label: 'En Pabellón / Box',
//     dot: 'bg-info animate-pulse',
//     classes: 'bg-sky-50 text-info border-info/30 font-semibold',
//   },
//   {
//     label: 'Completada / Alta',
//     dot: 'bg-success',
//     classes: 'bg-emerald-50 text-success border-success/30 font-semibold',
//   },
//   {
//     label: 'Reprogramada',
//     dot: 'bg-text-subtle',
//     classes: 'bg-bg-surface text-text-muted border-border-subtle',
//   },
//   {
//     label: 'Cancelada',
//     dot: 'bg-error',
//     classes: 'bg-red-50 text-error border-error/30 font-semibold',
//   },
//   {
//     label: 'No Asiste',
//     dot: 'bg-text-subtle',
//     classes: 'bg-bg-surface text-text-muted border-border-subtle',
//   },
// ] as const;

type FieldProps = {
  label: string;
  value?: string | null;
  className?: string;
  strong?: boolean;
  primary?: boolean;
};

const val = (value?: string | null) => value?.trim() || '-';

function Field({ label, value, className = '', strong, primary }: FieldProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-label-sm text-text-muted">{label}</span>
      <span
        className={`text-body-md mt-0.5 truncate ${
          primary
            ? 'text-label-md font-bold text-primary'
            : strong
              ? 'font-semibold text-text-primary'
              : 'text-text-primary'
        }`}
      >
        {val(value)}
      </span>
    </div>
  );
}

export default function InformacionGeneralTab({
  doctor,
}: {
  doctor: DoctorDetail;
}) {
  const person = doctor.person;
  const primary = doctor.specialties.find((spec) => spec.isPrimary);
  const secondary = doctor.specialties.filter((spec) => !spec.isPrimary);

  return (
    <>
      <section className="bg-bg-surface border border-border-default shadow-sm rounded-xl p-6 mt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-primary-light text-primary">
              <User className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="text-headline-sm text-text-primary font-semibold">
              Información Personal y Filiación Legal
            </h2>
          </div>
          <Badge variant="success" size="sm">
            IDENTIDAD DNI/RUT VALIDADA
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-bg-surface-subtle p-4 rounded-lg">
          <Field label="PRIMER NOMBRE" value={person.firstName} strong />
          <Field label="SEGUNDO NOMBRE" value={person.middleName} strong />
          <Field label="APELLIDOS" value={person.lastName} strong />
          <Field label="GÉNERO / ESTADO CIVIL" className="pt-2" />
          <Field label="FECHA DE NACIMIENTO" className="pt-2" />
          <Field
            label="TELÉFONO MÓVIL CLÍNICO"
            value={person.phone}
            className="pt-2"
            strong
          />
          <Field label="CORREO PERSONAL / RESPALDO" className="pt-2" />
        </div>
      </section>

      <section className="bg-bg-surface border border-border-default shadow-sm rounded-xl p-6 mt-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b border-border-subtle gap-2">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-sky-50 text-info">
              <Stethoscope className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-headline-sm text-text-primary font-semibold leading-tight">
                Especialidades Médicas y Certificaciones Clínicas
              </h2>
              <p className="text-body-sm text-text-muted">
                Acreditaciones vigentes otorgadas por CONACEO y Colegios
                Profesionales
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success border border-success/30 text-label-sm font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span>CONACEO: -</span>
          </div>
        </div>

        <div className="bg-bg-surface-subtle p-4 rounded-lg flex flex-col gap-2.5 ring-1 ring-border-subtle">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-label-sm text-text-muted flex items-center gap-1.5 font-semibold">
              <BadgeCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              Cualificación Profesional y Registro Nacional
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded bg-primary-light text-primary font-bold border border-primary/30">
              Registro Sanitario RNPI: -
            </span>
          </div>
          <p className="text-[18px] font-bold text-text-primary tracking-tight leading-snug">
            {val(doctor.qualification)}
            {doctor.qualification}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border-subtle">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-bg-surface border border-border-subtle text-text-primary text-label-sm">
              <Award className="h-3.5 w-3.5 text-info" aria-hidden="true" />-
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-bg-surface border border-border-subtle text-text-primary text-label-sm">
              <GraduationCap
                className="h-3.5 w-3.5 text-primary"
                aria-hidden="true"
              />
              -
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-bg-surface border border-border-subtle text-success text-label-sm font-medium">
              <ShieldCheck
                className="h-3.5 w-3.5 text-success"
                aria-hidden="true"
              />
              -
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {primary ? (
            <div className="bg-bg-surface-subtle p-4 rounded-lg flex flex-col gap-3 border-l-4 border-success ring-1 ring-border-subtle">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded bg-success/10 text-success text-label-sm font-bold flex items-center gap-1.5">
                  <Star className="h-4 w-4" aria-hidden="true" />
                  Especialidad Principal Acreditada
                </span>
                <span className="px-2.5 py-0.5 rounded bg-bg-surface border border-border-subtle text-text-primary text-label-sm font-semibold">
                  CONACEO: -
                </span>
              </div>
              <div>
                <h3 className="text-[20px] text-text-primary font-bold">
                  {primary.specialty.name}
                </h3>
                <p className="text-body-md text-text-muted mt-1.5 leading-relaxed">
                  {val(primary.specialty.description)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-text-muted font-semibold mr-1">
                  Procedimientos habilitados:
                </span>
                <span className="px-2 py-0.5 rounded bg-bg-surface border border-border-subtle text-text-primary text-[11px]">
                  -
                </span>
              </div>
            </div>
          ) : (
            <p className="text-body-sm text-text-muted">
              Sin especialidad principal acreditada
            </p>
          )}

          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-label-sm text-text-primary font-semibold tracking-wide uppercase flex items-center gap-1.5">
                <LayoutGrid className="h-4 w-4 text-info" aria-hidden="true" />
                Especialidades y Áreas Complementarias
              </span>
              <span className="text-[11px] text-text-muted">
                {secondary.length} acreditaciones activas
              </span>
            </div>
            {secondary.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {secondary.map((spec) => (
                  <div
                    key={spec.id}
                    className="p-3 rounded-lg bg-bg-surface-subtle flex flex-col justify-between gap-2 border border-border-subtle hover:bg-bg-surface-elevated transition-colors"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <Microscope
                          className="h-[18px] w-[18px] text-info"
                          aria-hidden="true"
                        />
                        <span className="text-[11px] text-success bg-success/10 px-1.5 py-0.5 rounded font-semibold">
                          Autorizado
                        </span>
                      </div>
                      <h4 className="text-body-sm font-semibold text-text-primary mt-1">
                        {spec.specialty.name}
                      </h4>
                      <p className="text-[11px] text-text-muted leading-tight">
                        {val(spec.specialty.description)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-body-sm text-text-muted">
                Sin especialidades complementarias
              </p>
            )}
          </div>
        </div>

        {/* <div className="bg-bg-surface-subtle p-4 rounded-lg flex flex-col gap-2.5 border-t border-border-subtle">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-label-sm text-text-primary font-semibold flex items-center gap-1.5">
              <ClipboardList
                className="h-4 w-4 text-primary"
                aria-hidden="true"
              />
              Capacidad de Atención y Estados de Cita Habilitados
            </span>
            <span className="px-2 py-0.5 rounded bg-success/10 text-success text-label-sm font-semibold">
              Disponibilidad: -
            </span>
          </div>
          <div className="flex flex-col gap-1.5 pt-0.5">
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {STATUS_CHIPS.map((chip) => (
                <span
                  key={chip.label}
                  className={`px-2.5 py-1 rounded border flex items-center gap-1 ${chip.classes}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${chip.dot}`} />
                  {chip.label}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1 text-text-muted text-body-sm text-[11px]">
              <Clock className="h-3.5 w-3.5 text-success" aria-hidden="true" />
              <span>
                Horas asistenciales activas:{' '}
                <strong className="text-text-primary font-medium">-</strong>
              </span>
            </div>
          </div>
        </div> */}
      </section>
    </>
  );
}
