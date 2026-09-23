import {
  Ban,
  Pill,
  IdCard,
  TestTubes,
  StickyNote,
  Stethoscope,
  TriangleAlert,
  GalleryHorizontalEnd,
} from 'lucide-react';

import { Badge } from '@/shared/components/ui';
import {
  SYSTEM_CODES,
  SISTEMAS_ANATOMICOS,
} from '@/modules/patients/constants/SistemasAnatomicos';
import type { PatientDetail } from '@/modules/patients/types/PatientDetail';

interface FichaGeneralTabProps {
  patient: PatientDetail;
}

export default function FichaGeneralTab({ patient }: FichaGeneralTabProps) {
  return (
    <>
      <section className="rounded-xl bg-bg-surface border border-border-default shadow-sm p-6 mt-6">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-default">
          <div className="flex items-center gap-2">
            <IdCard className="text-text-secondary" aria-hidden="true" />
            <h2 className="text-title-md font-bold text-text-primary">
              Información de Filiación y Demografía
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col p-3 rounded-lg bg-bg-surface-subtle">
            <span className="text-label-sm text-text-muted">Primer Nombre</span>
            <span className="text-label-lg text-text-primary font-semibold mt-0.5">
              {patient.firstName}
            </span>
          </div>
          <div className="flex flex-col p-3 rounded-lg bg-bg-surface-subtle">
            <span className="text-label-sm text-text-muted">
              Segundo Nombre
            </span>
            <span className="text-label-lg text-text-primary font-semibold mt-0.5">
              {patient.middleName ?? '-'}
            </span>
          </div>
          <div className="flex flex-col p-3 rounded-lg bg-bg-surface-subtle">
            <span className="text-label-sm text-text-muted">Apellidos</span>
            <span className="text-label-lg text-text-primary font-semibold mt-0.5">
              {patient.lastName}
            </span>
          </div>
          <div className="flex flex-col p-3 rounded-lg bg-bg-surface-subtle">
            <span className="text-label-sm text-text-muted">
              Fecha de Nacimiento
            </span>
            <span className="text-label-lg text-text-primary font-semibold mt-0.5">
              {patient.birthDate} (
              {patient.age != null ? `${patient.age} años` : '-'})
            </span>
          </div>
          <div className="flex flex-col p-3 rounded-lg bg-bg-surface-subtle">
            <span className="text-label-sm text-text-muted">Género</span>
            <span className="text-label-lg text-text-primary font-semibold mt-0.5 capitalize">
              {patient.gender}
            </span>
          </div>
          <div className="flex flex-col p-3 rounded-lg bg-bg-surface-subtle">
            <span className="text-label-sm text-text-muted">
              Ocupación / Profesión
            </span>
            <span className="text-label-lg text-text-primary font-semibold mt-0.5">
              {patient.occupation}
            </span>
          </div>
          <div className="sm:col-span-3 flex flex-col p-3 rounded-lg bg-bg-surface-subtle">
            <span className="text-label-sm text-text-muted">
              Dirección de Residencia
            </span>
            <span className="text-label-lg text-text-primary font-semibold mt-0.5">
              {patient.address}
            </span>
          </div>
        </div>
      </section>

      <section className="bg-bg-surface rounded-xl border border-border-default shadow-sm mt-6">
        <header className="flex gap-3 items-center p-6">
          <GalleryHorizontalEnd className="text-text-secondary" />
          <h3 className="text-headline-sm font-semibold text-text-secondary">
            Antecedentes Clínicos, Farmacología & Laboratorio
          </h3>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <div className="p-4 rounded-xl bg-bg-surface-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-text-secondary mb-2">
                <GalleryHorizontalEnd aria-hidden="true" />
                <span className="text-label-md font-bold uppercase tracking-wider">
                  Antecedentes Médicos
                </span>
              </div>
              <p className="text-headline-sm font-semibold text-text-primary mt-1">
                {patient.medicalHistory ||
                  'Sin antecedentes médicos registrados.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-bg-surface-elevated flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Pill size={20} aria-hidden="true" />
                  <span className="text-label-md font-bold uppercase tracking-wider">
                    Tratamiento Sistémico Actual
                  </span>
                </div>
                {patient.currentSystemicTreatment && (
                  <span className="px-2 py-0.5 rounded-full bg-primary text-text-inverse text-label-sm font-semibold">
                    Activo
                  </span>
                )}
              </div>
              <p className="text-headline-sm font-bold text-primary mt-1">
                {patient.currentSystemicTreatment ||
                  'Sin tratamiento sistémico registrado.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-error/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-error">
                  <TriangleAlert size={20} aria-hidden="true" />
                  <span className="text-label-md font-bold uppercase tracking-wider">
                    Alergias & Reacciones Adversas
                  </span>
                </div>
                {patient.allergicReactions && (
                  <span className="px-2 py-0.5 rounded-full bg-error text-text-inverse text-label-sm font-semibold">
                    Registrado
                  </span>
                )}
              </div>
              {patient.allergicReactions ? (
                <ul className="text-body-sm text-text-primary mt-2 flex flex-col gap-1">
                  {patient.allergicReactions
                    .split(',')
                    .map((allergy: string, index: number) => (
                      <li key={index} className="flex items-center gap-1.5">
                        <Ban
                          size={16}
                          className="text-error shrink-0"
                          aria-hidden="true"
                        />
                        <span>{allergy.trim()}</span>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-body-sm text-text-muted mt-2">
                  Sin alergias ni reacciones adversas registradas.
                </p>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-bg-surface-elevated flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-text-secondary">
                  <TestTubes size={20} aria-hidden="true" />
                  <span className="text-label-md font-bold uppercase tracking-wider">
                    Exámenes de Laboratorio
                  </span>
                </div>
                {patient.labResults && (
                  <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-label-sm font-semibold">
                    Registrado
                  </span>
                )}
              </div>
              <p className="text-headline-sm font-bold text-text-primary mt-1">
                {patient.labResults ||
                  'Sin exámenes de laboratorio registrados.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl bg-bg-surface border border-border-default shadow-sm p-6 mt-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-3 mb-4 border-b border-border-default">
          <div className="flex items-center justify-center gap-2">
            <Stethoscope className="text-text-secondary" aria-hidden="true" />
            <h2 className="text-title-md font-bold text-text-primary">
              Revisión Sistémica por Órganos y Sistemas
            </h2>
          </div>
          <Badge className="text-label-sm text-text-muted font-medium">
            {SISTEMAS_ANATOMICOS.length} Órganos Auditados
          </Badge>
        </div>

        <div className="p-4 rounded-xl bg-bg-surface-subtle mb-4 flex items-start gap-2">
          <div className="w-8 h-8 rounded-lg bg-bg-surface-elevated text-primary flex items-center justify-center shrink-0">
            <StickyNote size={20} aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-label-sm uppercase tracking-wider text-primary font-bold">
              Notas de Evaluación de Sistemas
            </span>
            <p className="text-title-md font-semibold text-text-primary mt-0.5">
              {patient.systemicReview.systemEvaluationNotes ||
                'Sin notas de evaluación registradas.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {SISTEMAS_ANATOMICOS.map((sistema) => {
            const Icono = sistema.icono;
            const hasIssue = Boolean(patient.systemicReview[sistema.dtoKey]);
            return (
              <div
                key={sistema.id}
                className={`p-3 rounded-xl ${
                  hasIssue ? 'bg-error/10' : 'bg-bg-surface-subtle'
                } flex flex-col justify-between`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        hasIssue
                          ? 'bg-error/10 text-error'
                          : 'bg-bg-surface-elevated text-text-secondary'
                      }`}
                    >
                      <Icono size={16} aria-hidden="true" />
                    </span>
                    <span className="text-label-md font-bold text-text-primary">
                      {SYSTEM_CODES[sistema.dtoKey]}
                    </span>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      hasIssue ? 'bg-error' : 'bg-success'
                    }`}
                    title={hasIssue ? 'Con observaciones' : 'Sin observaciones'}
                  />
                </div>
                <div className="mt-3">
                  <div className="text-label-sm font-semibold text-text-primary">
                    {sistema.nombre}
                  </div>
                  <span
                    className={`text-[11px] font-medium ${
                      hasIssue ? 'text-error' : 'text-text-secondary'
                    }`}
                  >
                    {sistema.dtoKey}: {hasIssue ? 'hallazgo' : 'normal'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
