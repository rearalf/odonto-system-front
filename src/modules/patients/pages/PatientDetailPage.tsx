import { Link } from 'react-router-dom';
import {
  User,
  Copy,
  Cake,
  Phone,
  Locate,
  Loader2,
  Luggage,
  PhoneCall,
  RefreshCw,
  SquarePen,
  CalendarPlus,
} from 'lucide-react';

import {
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  WhatsAppIcon,
} from '@/shared/components/ui';

import { usePatientDetail } from '@/modules/patients/hooks/usePatientDetail';
import PatientNavTabs from '@/modules/patients/components/PatientNavTabs';
import FichaGeneralTab from '@/modules/patients/components/tabs/FichaGeneralTab';
import OdontogramaTab from '@/modules/patients/components/tabs/OdontogramaTab';
import HistorialCitasTab from '@/modules/patients/components/tabs/HistorialCitasTab';
import PresupuestosPagosTab from '@/modules/patients/components/tabs/PresupuestosPagosTab';
import ConsentimientosRxTab from '@/modules/patients/components/tabs/ConsentimientosRxTab';

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
            <FichaGeneralTab patient={patient} />
          )}
          {activeTab === 'odontograma' && <OdontogramaTab />}
          {activeTab === 'historial-citas' && <HistorialCitasTab />}
          {activeTab === 'presupuestos-pagos' && <PresupuestosPagosTab />}
          {activeTab === 'consentimientos-rx' && <ConsentimientosRxTab />}
        </>
      )}
    </>
  );
}
