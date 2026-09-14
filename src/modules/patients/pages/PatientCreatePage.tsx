import { useState } from 'react';
import { format, subYears } from 'date-fns';
import { Calendar, CreditCard, User, Users, IdCard } from 'lucide-react';
import Breadcrumbs from '@/shared/components/ui/Breadcrumbs';
import { FieldMock } from '@/shared/components/ui/form/FieldMock';
import InputField from '@/shared/components/ui/form/InputField';
import { SelectField } from '@/shared/components/ui/form/SelectField';
import DateField from '@/shared/components/ui/form/DateField';
import { PhotoUploadCard } from '@/modules/patients/components/PhotoUploadCard';
import { calculateAge } from '@/shared/utils/date';

export default function PatientCreatePage() {
  const maxBirthDate = format(subYears(new Date(), 1), 'yyyy-MM-dd');
  const [birthDate, setBirthDate] = useState(maxBirthDate);
  const age = calculateAge(birthDate);

  return (
    <div>
      <Breadcrumbs />

      <h1 className="text-2xl font-bold text-text-primary">Nuevo paciente</h1>
      <p className="mt-1 text-sm text-text-muted">
        Complete la información requerida del paciente. Los campos marcados con
        (<span className="text-orange-400">*</span>) son obligatorios para la
        apertura oficial del expediente clínico y la asignación del número de
        historia.
      </p>

      <div className="mt-6 rounded-xl border border-border-default bg-bg-surface p-8 shadow-sm">
        <div className="flex">
          <div className="bg-bg-surface-elevated p-2 rounded-lg text-primary">
            <IdCard />
          </div>
          <h2 className="text-xl font-semibold text-text-primary">
            1. Información Personal del Paciente
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
      </div>

      <div className="mt-6">
        <PhotoUploadCard />
      </div>
    </div>
  );
}
