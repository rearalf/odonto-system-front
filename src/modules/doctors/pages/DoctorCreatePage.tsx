import { useState } from 'react';
import {
  Badge,
  InputField,
  Breadcrumbs,
  TextAreaField,
  MaskedInputField,
  Button,
  SelectField,
  MultiSelectField,
  FieldLabel,
} from '@/shared/components/ui';
import {
  BriefcaseMedical,
  GraduationCap,
  IdCard,
  Info,
  Link,
  Plus,
  Star,
  ToggleRight,
  Trash,
  User,
  UserCog,
} from 'lucide-react';

export default function DoctorCreatePage() {
  const [roles, setRoles] = useState<string[]>([]);

  return (
    <>
      <Breadcrumbs />

      <h1 className="mt-4 text-headline-lg font-bold text-text-primary">
        Nuevo Doctor
      </h1>
      <p className="mt-1 text-body-md text-text-muted">
        Complete la información requerida del doctor. Los campos marcados con (
        <span className="text-orange-400">*</span>) son obligatorios para la
        apertura oficial.
      </p>

      <form noValidate>
        <section className="mt-6 rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex items-center gap-4 flex-wrap justify-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-bg-surface-elevated p-2 text-primary shrink-0">
                <IdCard aria-hidden="true" size={32} />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <h2 className="text-headline-md font-semibold text-text-primary">
                  1. Información Personal
                </h2>
                <p className="text-body-md text-text-muted">
                  Identificación del profesional de salud.
                </p>
              </div>
            </div>
            <Badge variant="error" size="md" className="shrink-0">
              OBLIGATORIO
            </Badge>
          </div>
          <hr className="mb-4 border-border-strong" />
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
              leftIcon={User}
              placeholder="Ej. Gómez Mendoza"
            />
            {/* <Controller
              control={control}
              name="phone"
              render={({ field }) => ( */}
            <MaskedInputField
              id="telefono"
              label="Teléfono Celular Primario"
              required
              inputMode="tel"
              prefix="+503"
              mask="0000 0000"
              placeholder="#### ####"
              unmask
            />
            {/* )}
            /> */}
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="rounded-lg bg-bg-surface-elevated p-2 text-primary shrink-0">
                <BriefcaseMedical aria-hidden="true" size={32} />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <h2 className="text-headline-md font-semibold text-text-primary">
                  2. Perfil Profesional y Especialidades Clínicas
                </h2>
                <p className="text-body-md text-text-muted">
                  Acreditación facultativa y áreas de atención asistencial.
                </p>
              </div>
            </div>
          </div>
          <hr className="mb-4 border-border-strong" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
            <TextAreaField
              id="direccion"
              label="Título Académico Principal / Posgrados"
              leftIcon={GraduationCap}
              rows={3}
              maxLength={100}
              placeholder="Especialista en Cirugía Oral y Maxilofacial, MSc Implantología Clínica Avanzada (U. de Chile)..."
              labelEnd={
                <Badge variant="info" size="md" className="mb-3 md:mb-0">
                  Máx. 255 caracteres
                </Badge>
              }
            />

            <section className="flex flex-col items-start gap-6 rounded-2xl border border-border-subtle bg-bg-surface-elevated p-6 shadow-sm">
              <div className="flex flex-col items-start gap-1">
                <h2 className="text-headline-sm font-medium text-text-secondary">
                  Gestor Dinámico de Especialidades
                </h2>
                <p className="text-body-md text-text-muted">
                  Asigne las disciplinas que el doctor está facultado para
                  tratar en los módulos de Odontograma y Presupuesto
                </p>
                <Badge variant="info" size="sm" className="mt-2 text-center">
                  Especialidades añadidas: 3 de 20 máx.
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full items-center">
                <div className="flex-1">
                  <SelectField
                    id="especialidad"
                    label="Seleccionar especialidad"
                    required
                    leftIcon={GraduationCap}
                  >
                    <option value="" disabled selected>
                      Seleccionar especialidad
                    </option>
                    <option value="ortodoncia">Ortodoncia</option>
                    <option value="endodoncia">Endodoncia</option>
                    <option value="periodoncia">Periodoncia</option>
                    <option value="cirugia-oral">Cirugía Oral</option>
                    <option value="implantologia">Implantología</option>
                    <option value="odontopediatria">Odontopediatría</option>
                    <option value="prostodoncia">Prótesis Dental</option>
                    <option value="radiologia">Radiología Oral</option>
                  </SelectField>
                </div>
                <Button icon={<Plus />}>Añadir </Button>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-wrap items-center justify-center lg:justify-between p-6 rounded-lg bg-bg-surface shadow-sm gap-6 text-text-primary">
                  <div className="flex items-center gap-4 flex-col md:flex-row">
                    <div className="p-2 rounded-lg bg-bg-surface-subtle text-on-surface-variant flex items-center justify-center">
                      <GraduationCap />
                    </div>
                    <div className="flex flex-col gap-3 text-center md:text-left md:gap-0.5">
                      <div className="flex flex-col items-center gap-2 sm:flex-row">
                        <span className="text-label-lg">
                          Geriatría Odontológica
                        </span>
                        <Badge
                          variant="primary"
                          size="sm"
                          className="py-1! px-3! text-left"
                        >
                          <Star size={16} />
                          Especialidad principal
                        </Badge>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Se ocupa de los problemas dentales y orales relacionados
                        con el envejecimiento y el cuidado dental de personas
                        mayores.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      color="info"
                      size="sm"
                      title="Marcar como principal"
                    >
                      <Star />
                    </Button>
                    <Button
                      variant="ghost"
                      color="error"
                      title="Eliminar especialidad"
                      size="sm"
                    >
                      <Trash />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center text-center text-body-sm md:flex-row md:text-left bg-amber-50 text-warning rounded-md font-medium p-4">
                <Info size={18} />
                <p>
                  <span className="font-bold">Regla:</span> Solo una
                  especialidad puede ser designada como Principal. Las demás
                  actúan como competencias complementarias de atención.
                </p>
              </div>
            </section>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="rounded-lg bg-bg-surface-elevated p-2 text-primary shrink-0">
                <UserCog aria-hidden="true" size={32} />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <h2 className="text-headline-md font-semibold text-text-primary">
                  3. Cuenta de Acceso y Roles
                </h2>
                <p className="text-body-md text-text-muted">
                  Gestión de credenciales para la estación de trabajo y
                  asignación de roles asistenciales.
                </p>
              </div>
            </div>
          </div>
          <hr className="mb-4 border-border-strong" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1 rounded-2xl border border-border-subtle bg-bg-surface-elevated p-6 shadow-sm">
            <div className="flex gap-3">
              <ToggleRight className="text-primary shrink-0" />
              <h3 className="text-headline-sm font-medium text-text-secondary">
                Creación de Usuario y Asignación de Perfiles
              </h3>
            </div>
            <hr className="mb-4 border-border-strong" />
            <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2">
              <InputField
                label="Correo"
                required
                placeholder="dra.jensen@dentalcare.com"
                type="email"
                validationState="valid"
              />

              <div className="bg-bg-surface-subtle p-4 rounded-md flex gap-4 flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <div className="p-2 bg-bg-surface-elevated rounded-md text-primary">
                  <Link />
                </div>
                <div className="flex flex-col flex-1 gap-2">
                  <p className="text-headline-sm font-semibold text-text-primary">
                    Activación mediante Enlace Seguro
                  </p>
                  <p className="text-body-lg font-normal text-text-secondary">
                    Al registrar, el sistema generará automáticamente un enlace
                    seguro de acceso y activación temporal de un solo uso. El
                    profesional establecerá su contraseña personal directamente
                    al ingresar por primera vez
                  </p>
                </div>
              </div>
            </div>
            <hr className="border-border-strong" />
            <div>
              <FieldLabel label="Roles Asignados al Usuario" required />
              <p className="text-text-muted text-body-sm mb-3">
                Catálogo de perfiles asistenciales y privilegios clínicos.
              </p>
              <MultiSelectField
                id="roles"
                required
                leftIcon={UserCog}
                className="w-full"
                options={[
                  { value: 'admin', label: 'Administrador' },
                  { value: 'doctor', label: 'Doctor' },
                  { value: 'asistente', label: 'Asistente' },
                  { value: 'recepcionista', label: 'Recepcionista' },
                  { value: 'higienista', label: 'Higienista Dental' },
                ]}
                value={roles}
                onChange={setRoles}
              />
              <div className="flex flex-col gap-2 items-center text-center text-body-sm md:flex-row md:text-left text-text-muted rounded-md font-medium p-4">
                <Info size={18} className="text-primary" />
                Seleccione uno o más roles del catálogo. El doctor heredará
                automáticamente todas las capacidades y políticas de seguridad
                asociadas a los roles seleccionados.
              </div>
            </div>
          </div>
        </section>

        <div className="flex gap-4 mb-8 mt-6 justify-end">
          <Button variant="solid" color="error">
            Descartar
          </Button>
          <Button type="submit">Registrar Doctor</Button>
        </div>
      </form>
    </>
  );
}
