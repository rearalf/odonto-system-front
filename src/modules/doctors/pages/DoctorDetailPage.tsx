import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import {
  BadgeCheck,
  CalendarClock,
  Copy,
  Loader2,
  Phone,
  PhoneCall,
  RefreshCw,
  SquarePen,
  Users,
  UserX,
} from 'lucide-react';
import {
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  NavTabs,
  WhatsAppIcon,
} from '@/shared/components/ui';
import { DoctorNavTabsOptions } from '../constants/doctorNavTabs';
import { useDoctorDetail } from '../hooks/useDoctorDetail';
import InformacionGeneralTab from '../components/tabs/InformacionGeneralTab';
import EspecialidadesTab from '../components/tabs/EspecialidadesTab';
import CuentaAccesoTab from '../components/tabs/CuentaAccesoTab';
import AgendaBoxesTab from '../components/tabs/AgendaBoxesTab';
import AuditoriaTab from '../components/tabs/AuditoriaTab';

export default function DoctorDetailPage() {
  const {
    isLoading,
    isError,
    breadcrumbsItems,
    activeTab,
    setActiveTab,
    doctor,
    phoneDigits,
    phone,
    handleCopyPhone,
    refetch,
  } = useDoctorDetail();

  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />

      <section className="flex flex-col gap-3 mt-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-1">
          {!isLoading && !isError && doctor && (
            <h1 className="text-headline-lg font-bold text-text-primary">
              Dr. {doctor.fullName}
            </h1>
          )}
        </div>

        {!isLoading && !isError && doctor && (
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
            <Badge variant="primary" className="flex items-center gap-4">
              <Link
                to={`tel:${doctor.person.phone}`}
                className="flex gap-2 items-center min-w-0"
                aria-label="Llamar al número de teléfono"
                title="Llamar"
              >
                <Phone
                  size={18}
                  className="shrink-0"
                  aria-label="Llamar al número de teléfono"
                />
                <span className="truncate">{phone}</span>
              </Link>

              <span className="flex items-center gap-4 shrink-0">
                <button
                  type="button"
                  aria-label="Copiar teléfono"
                  title="Copiar"
                  className="rounded p-0.5 text-current opacity-70 transition hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none"
                  onClick={() => handleCopyPhone(phoneDigits)}
                >
                  <Copy className="h-5 w-5" aria-hidden="true" />
                </button>

                <Link
                  to={`tel:${doctor.person.phone}`}
                  aria-label="Llamar al número de teléfono"
                  title="Llamar"
                  className="rounded p-0.5 text-current opacity-70 transition hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none"
                >
                  <PhoneCall className="h-5 w-5" aria-hidden="true" />
                </Link>
              </span>
            </Badge>
            <Link
              to={`/doctors/${doctor.id}/edit`}
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
          </div>
        )}
      </section>

      {isLoading && (
        <div className="bg-bg-surface rounded-xl border border-border-default shadow-sm p-8 mt-6 flex items-center justify-center">
          <Loader2
            className="h-6 w-6 animate-spin text-primary"
            aria-hidden="true"
          />
        </div>
      )}

      {!isLoading && (isError || !doctor) && (
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

      {!isLoading && !isError && doctor && (
        <>
          <section className="rounded-xl bg-bg-surface border border-border-default shadow-sm p-6 mt-6">
            <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 min-w-0">
                <div className="relative shrink-0">
                  <Avatar
                    name={doctor.fullName}
                    alt={`Foto de ${doctor.fullName}`}
                    size="lg"
                    src={doctor.person.profilePictureUrl}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-bg-surface p-1 rounded-full">
                    <span className="block w-4 h-4 bg-success rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-headline-lg font-bold text-text-primary tracking-tight">
                      Dr. {doctor.fullName}
                    </h1>
                    <BadgeCheck
                      size={22}
                      className="text-primary shrink-0"
                      aria-label="Facultativo Titular Verificado"
                    />
                  </div>
                  <p className="text-body-md text-primary font-medium">
                    {doctor.specialties.find((s) => s.isPrimary)?.specialty
                      .name ?? 'Sin especialidad principal'}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-label-sm">
                    <span className="px-2 py-0.5 rounded bg-bg-surface-subtle text-primary font-bold">
                      #DOC-{String(doctor.id).padStart(3, '0')}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-bg-surface-subtle text-primary">
                      PERSON ID: #{doctor.personId}
                    </span>
                    {/* <span className="px-2 py-0.5 rounded bg-bg-surface-subtle text-text-muted">
                      TIPO: ODONTÓLOGO (4)
                    </span> */}
                    <span className="px-2 py-0.5 rounded bg-bg-surface-subtle text-primary">
                      ESPECIALIDADES: {doctor.specialties.length}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-bg-surface-subtle text-primary">
                      ALTA: {format(parseISO(doctor.createdAt), 'dd/MM/yyyy')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-bg-surface-subtle p-3 rounded-lg">
                <div className="flex flex-col px-3 py-2 bg-bg-surface/60 rounded">
                  <span className="text-label-sm text-text-muted flex items-center justify-between gap-2">
                    CITAS DE HOY
                    <CalendarClock
                      size={15}
                      className="text-primary shrink-0"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-headline-md font-bold text-text-primary leading-none mt-1 tabular-nums">
                    0
                  </span>
                  <span className="text-body-sm text-success mt-1">
                    0 completadas
                  </span>
                </div>

                <div className="flex flex-col px-3 py-2 bg-bg-surface/60 rounded">
                  <span className="text-label-sm text-text-muted flex items-center justify-between gap-2">
                    Tasa de Ausentismo
                    <UserX
                      size={15}
                      className="text-danger shrink-0"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-headline-md font-bold text-primary leading-none mt-1 tabular-nums">
                    0 %
                  </span>
                  <span className="text-body-sm text-text-muted mt-1">
                    Basado en histórico (No-Shows)
                  </span>
                </div>

                <div className="flex flex-col px-3 py-2 bg-bg-surface/60 rounded">
                  <span className="text-label-sm text-text-muted flex items-center justify-between gap-2">
                    Total Pacientes
                    <Users
                      size={15}
                      className="text-primary shrink-0"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-headline-md font-bold text-text-primary mt-1 truncate">
                    0
                  </span>
                  <span className="text-body-sm text-success mt-1">
                    +0 este mes
                  </span>
                </div>
              </div>
            </div>
          </section>

          <NavTabs
            label="Doctor"
            tabs={DoctorNavTabsOptions}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === 'informacion-general' && <InformacionGeneralTab />}
          {activeTab === 'especialidades-acreditaciones' && (
            <EspecialidadesTab />
          )}
          {activeTab === 'cuenta-acceso' && <CuentaAccesoTab />}
          {activeTab === 'agenda-boxes' && <AgendaBoxesTab />}
          {activeTab === 'auditoria-trazabilidad' && <AuditoriaTab />}
        </>
      )}
    </>
  );
}
