import { useState } from 'react';
import { format, subYears } from 'date-fns';
import {
  Briefcase,
  Calendar,
  CreditCard,
  Home,
  IdCard,
  Phone,
  User,
  Users,
} from 'lucide-react';

import Breadcrumbs from '@/shared/components/ui/Breadcrumbs';
import { Badge } from '@/shared/components/ui/Badge';
import FieldMock from '@/shared/components/ui/form/FieldMock';
import SelectField from '@/shared/components/ui/form/SelectField';
import InputField from '@/shared/components/ui/form/InputField';
import MaskedInputField from '@/shared/components/ui/form/MaskedInputField';
import DateField from '@/shared/components/ui/form/DateField';
import TextAreaField from '@/shared/components/ui/form/TextAreaField';

import { PhotoUploadCard } from '@/modules/patients/components/PhotoUploadCard';

import { calculateAge } from '@/shared/utils/date';

export default function PatientCreatePage() {
  const maxBirthDate = format(subYears(new Date(), 1), 'yyyy-MM-dd');
  const [birthDate, setBirthDate] = useState(maxBirthDate);
  const age = calculateAge(birthDate);

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
        <PhotoUploadCard />
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <InputField
            id="primer-nombre"
            label="Primer Nombre"
            required
            leftIcon={User}
            placeholder="Ej. Carlos"
          />
          <InputField
            id="segundo-nombre"
            label="Segundo Nombre"
            optional
            leftIcon={User}
            placeholder="Ej. Eduardo"
          />
          <InputField
            id="apellidos"
            label="Apellidos Completos"
            required
            leftIcon={Users}
            placeholder="Ej. Gómez Mendoza"
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
          />
          <SelectField
            id="genero"
            label="Género Biológico / Legal"
            required
            leftIcon={Users}
            defaultValue=""
          >
            <option value="" disabled>
              Seleccione una opción
            </option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </SelectField>
          <FieldMock
            label="Documento de Identidad (DNI / RUT)"
            leftIcon={CreditCard}
            placeholder="18.940.321-K"
          />
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
          <MaskedInputField
            id="telefono"
            label="Teléfono Celular Primario"
            required
            inputMode="tel"
            prefix="+503"
            mask="0000 0000"
            placeholder="#### ####"
          />
          <InputField
            id="ocupacion"
            label="Ocupación / Profesión"
            leftIcon={Briefcase}
            placeholder="Ej. Ingeniero de Software"
          />
          <div className="md:col-span-2">
            <TextAreaField
              id="direccion"
              label="Dirección Completa de Residencia"
              leftIcon={Home}
              rows={3}
              placeholder="Dirección completa (calle, número, piso, puerta, código postal y ciudad de residencia)..."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
