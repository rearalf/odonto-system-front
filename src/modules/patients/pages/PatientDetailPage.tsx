import { Link } from 'react-router-dom';
import {
  Ban,
  BriefcaseMedical,
  Cake,
  CalendarPlus,
  Copy,
  GalleryHorizontalEnd,
  IdCard,
  Loader2,
  Locate,
  Luggage,
  Phone,
  PhoneCall,
  Pill,
  RefreshCw,
  SquarePen,
  Stethoscope,
  StickyNote,
  TestTubes,
  TriangleAlert,
  User,
} from 'lucide-react';

import { Avatar, Badge, Breadcrumbs, Button } from '@/shared/components/ui';
import { usePatientDetail } from '@/modules/patients/hooks/usePatientDetail';
import {
  SISTEMAS_ANATOMICOS,
  SYSTEM_CODES,
} from '@/modules/patients/constants/SistemasAnatomicos';
import WhatsAppIcon from '@/shared/components/ui/Icons/WhatsApp';
import PatientNavTabs from '@/modules/patients/components/PatientNavTabs';

export default function PatientDetailPage() {
  const {
    patient,
    breadcrumbsItems,
    phoneDigits,
    isLoading,
    isError,
    activeTab,
    refetch,
    handleCopyPhone,
    setActiveTab,
  } = usePatientDetail();

  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />

      <div className="flex flex-col gap-3 mt-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-headline-sm font-semibold text-text-secondary">
            Detalle del paciente
          </h1>
          {!isLoading && !isError && patient && (
            <h2 className="text-headline-lg font-bold text-text-primary">
              {patient.fullName}
            </h2>
          )}
        </div>

        {!isLoading && !isError && patient && (
          <div className="flex flex-col gap-2 w-full sm:flex-row sm:flex-wrap sm:w-auto">
            <Link
              to={`https://wa.me/${phoneDigits}`}
              rel="noopener noreferrer"
              target="_blank"
              className="flex w-full sm:w-auto"
            >
              <Button
                variant="solid"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700"
                size="sm"
              >
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </Button>
            </Link>
            <Link
              to={`/patients/${patient.id}/edit`}
              className="flex w-full sm:w-auto"
            >
              <Button
                variant="solid"
                color="info"
                size="sm"
                className="w-full sm:w-auto"
              >
                <SquarePen /> Editar Ficha
              </Button>
            </Link>

            <Link
              to={`/patients/${patient.id}/edit`}
              className="flex w-full sm:w-auto"
            >
              <Button
                variant="solid"
                color="info"
                size="sm"
                className="w-full sm:w-auto"
              >
                <CalendarPlus /> Agendar Cita
              </Button>
            </Link>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="bg-bg-surface rounded-xl border border-border-default shadow-sm p-8 mt-6 flex items-center justify-center">
          <Loader2
            className="h-6 w-6 animate-spin text-primary"
            aria-hidden="true"
          />
        </div>
      )}

      {!isLoading && (isError || !patient) && (
        <div className="bg-bg-surface rounded-xl border border-border-default shadow-sm p-8 mt-6 text-center">
          <p className="text-body-md text-text-muted">
            No se pudo cargar el expediente del paciente.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            icon={<RefreshCw className="h-4 w-4" aria-hidden="true" />}
            onClick={() => refetch()}
          >
            Reintentar
          </Button>
        </div>
      )}

      {!isLoading && !isError && patient && (
        <>
          <section className="flex flex-col items-center gap-4 bg-bg-surface rounded-xl border border-border-default shadow-sm p-4 sm:p-6 lg:p-8 mt-6 xl:flex-row xl:justify-between xl:items-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-3 relative">
                <Avatar
                  name={patient.fullName}
                  alt={`Foto de ${patient.fullName}`}
                  size="lg"
                  src={patient.avatarUrl}
                />

                {/* <Badge variant="info" className="absolute -bottom-1 -right-1">
                Activo
              </Badge> */}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-center gap-2 flex-col md:flex-row">
                  <h2 className="text-headline-sm font-bold text-text-primary">
                    {patient.fullName}
                  </h2>
                  <Badge variant="primary" className="px-3  py-1.5">
                    <Cake size={22} />
                    {patient.age != null ? `${patient.age} años` : '-'} (
                    {patient.birthDate})
                  </Badge>

                  <Badge variant="primary" className="px-3  py-1.5">
                    <User size={22} />
                    {patient.gender}
                  </Badge>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-4 mt-3">
                  <Badge variant="info" className="flex items-center gap-1">
                    <Luggage />
                    {patient.occupation}
                  </Badge>
                  <Badge
                    variant="info"
                    className="flex items-center gap-1 max-w-40"
                  >
                    <Locate className="shrink-0" />
                    <span className="truncate">{patient.address}</span>
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Badge variant="primary" className="flex items-center gap-4">
                <span className="flex gap-2 items-center min-w-0">
                  <Phone size={18} className="shrink-0" />
                  <span className="truncate">{patient.phone}</span>
                </span>

                <span className="flex items-center gap-4 shrink-0">
                  <button
                    type="button"
                    aria-label="Copiar teléfono"
                    title="Copiar"
                    className="rounded p-0.5 text-current opacity-70 transition hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none"
                    onClick={handleCopyPhone}
                  >
                    <Copy className="h-5 w-5" aria-hidden="true" />
                  </button>

                  <Link
                    to={`tel:${patient.phone}`}
                    aria-label="Llamar al número de teléfono"
                    title="Llamar"
                    className="rounded p-0.5 text-current opacity-70 transition hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none"
                  >
                    <PhoneCall className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </span>
              </Badge>
            </div>
          </section>

          <PatientNavTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'ficha-general' && (
            <>
              <section className="rounded-xl bg-bg-surface border border-border-default shadow-sm p-6 mt-6">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-default">
                  <div className="flex items-center gap-2">
                    <IdCard
                      className="text-text-secondary"
                      aria-hidden="true"
                    />
                    <h2 className="text-title-md font-bold text-text-primary">
                      Información de Filiación y Demografía
                    </h2>
                  </div>
                  {/* <span className="text-code text-text-muted">
                    Código Interno: {patient.id}
                  </span> */}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col p-3 rounded-lg bg-bg-surface-subtle">
                    <span className="text-label-sm text-text-muted">
                      Primer Nombre
                    </span>
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
                    <span className="text-label-sm text-text-muted">
                      Apellidos
                    </span>
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
                    <span className="text-label-sm text-text-muted">
                      Género
                    </span>
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
                  <div className="sm:col-span-2 flex flex-col p-3 rounded-lg bg-bg-surface-subtle">
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
                  <BriefcaseMedical className="text-text-secondary" />
                  <h3 className="text-headline-sm font-semibold text-text-secondary">
                    Antecedentes Clínicos, Farmacología &amp; Laboratorio
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
                            Alergias &amp; Reacciones Adversas
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
                            .map((allergy, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-1.5"
                              >
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

              <div className="rounded-xl bg-bg-surface border border-border-default shadow-sm p-6 mt-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-3 mb-4 border-b border-border-default">
                  <div className="flex items-center justify-center gap-2">
                    <Stethoscope
                      className="text-text-secondary"
                      aria-hidden="true"
                    />
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
                    const hasIssue = Boolean(
                      patient.systemicReview[sistema.dtoKey],
                    );
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
                            title={
                              hasIssue
                                ? 'Con observaciones'
                                : 'Sin observaciones'
                            }
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
              </div>
            </>
          )}

          {activeTab === 'odontograma' && (
            <div className="rounded-xl bg-bg-surface border border-border-default shadow-sm p-6 mt-6 text-center text-text-muted">
              <p>Odontograma Dental - Próximamente</p>
            </div>
          )}

          {activeTab === 'historial-citas' && (
            <div className="rounded-xl bg-bg-surface border border-border-default shadow-sm p-6 mt-6 text-center text-text-muted">
              <p>Historial de Citas - Próximamente</p>
            </div>
          )}

          {activeTab === 'presupuestos-pagos' && (
            <div className="rounded-xl bg-bg-surface border border-border-default shadow-sm p-6 mt-6 text-center text-text-muted">
              <p>Presupuestos y Pagos - Próximamente</p>
            </div>
          )}

          {activeTab === 'consentimientos-rx' && (
            <div className="rounded-xl bg-bg-surface border border-border-default shadow-sm p-6 mt-6 text-center text-text-muted">
              <p>Consentimientos & Rx - Próximamente</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
