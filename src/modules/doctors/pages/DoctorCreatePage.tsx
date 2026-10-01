import {
  Badge,
  Button,
  InputField,
  // FieldLabel,
  Breadcrumbs,
  SelectField,
  TextAreaField,
  MaskedInputField,
  // MultiSelectField,
} from '@/shared/components/ui';
import {
  BriefcaseMedical,
  GraduationCap,
  IdCard,
  Info,
  // Link,
  // Plus,
  Star,
  // ToggleRight,
  Trash,
  User,
  // UserCog,
} from 'lucide-react';
import { useDoctorCreate } from '@/modules/doctors/hooks/useDoctorCreate';
// TODO: se usará más adelante
// import { Controller } from 'react-hook-form';

export default function DoctorCreatePage() {
  const {
    register,
    errors,
    isSubmitting,
    onSubmit,
    handleCancel,
    specialties = [],
    specialtiesOptions = [],
    isSpecialtiesLoading,
    // roles,
    // setRoles,
    // rolesOptions = [],
    // isRolesLoading,
    handleSpecialtyAdd,
    handleSpecialtyRemove,
    handleSpecialtySetPrimary,
  } = useDoctorCreate();

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

      <form onSubmit={onSubmit} noValidate>
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
              error={errors.firstName?.message}
              {...register('firstName')}
            />
            <InputField
              id="segundo-nombre"
              label="Segundo Nombre"
              optional
              leftIcon={User}
              placeholder="Ej. Eduardo"
              error={errors.middleName?.message}
              {...register('middleName')}
            />
            <InputField
              id="apellidos"
              label="Apellidos Completos"
              required
              leftIcon={User}
              placeholder="Ej. Gómez Mendoza"
              error={errors.lastName?.message}
              {...register('lastName')}
            />
            <MaskedInputField
              id="telefono"
              label="Teléfono Celular Primario"
              required
              inputMode="tel"
              prefix="+503"
              mask="0000 0000"
              placeholder="#### ####"
              unmask
              error={errors.phone?.message}
              {...register('phone')}
            />
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
              id="calificacion"
              label="Título Académico Principal / Posgrados"
              leftIcon={GraduationCap}
              rows={3}
              maxLength={255}
              placeholder="Especialista en Cirugía Oral y Maxilofacial, MSc Implantología Clínica Avanzada (U. de Chile)..."
              labelEnd={
                <Badge variant="info" size="md" className="mb-3 md:mb-0">
                  Máx. 255 caracteres
                </Badge>
              }
              error={errors.qualification?.message}
              {...register('qualification')}
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
                  Especialidades añadidas: {specialties.length} de 20 máx.
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full items-center">
                <div className="flex-1">
                  <SelectField
                    id="especialidad"
                    label="Seleccionar especialidad"
                    required
                    leftIcon={GraduationCap}
                    onChange={(e) => handleSpecialtyAdd(e.target.value)}
                    disabled={isSpecialtiesLoading}
                    defaultValue=""
                    error={errors.specialties?.message}
                  >
                    <option value="" disabled>
                      {isSpecialtiesLoading
                        ? 'Cargando...'
                        : 'Seleccionar especialidad'}
                    </option>
                    {specialtiesOptions.map((opt) => (
                      <option
                        key={opt.id}
                        value={opt.value}
                        disabled={specialties.some(
                          (s) => s.specialtyId === opt.id,
                        )}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </SelectField>
                </div>
              </div>
              <ul className="flex flex-col list-none gap-4 w-full max-h-96 overflow-auto p-0 m-0">
                {specialties.length === 0 ? (
                  <li className="text-center text-text-muted py-8">
                    No hay especialidades añadidas
                  </li>
                ) : (
                  specialties.map((item) => {
                    const opt = specialtiesOptions.find(
                      (o) => o.id === item.specialtyId,
                    );
                    const isPrimary = item.isPrimary;
                    return (
                      <li
                        key={item.specialtyId}
                        className="grid justify-items-center lg:flex lg:justify-between p-6 rounded-lg bg-bg-surface shadow-sm gap-6 text-text-primary"
                      >
                        <div className="flex items-center gap-4 flex-col md:flex-row">
                          <div className="p-2 rounded-lg bg-bg-surface-elevated text-primary flex items-center justify-center">
                            <GraduationCap />
                          </div>
                          <div className="flex flex-col gap-3 text-center md:text-left md:gap-0.5">
                            <div className="flex flex-col items-center gap-2 sm:flex-row">
                              <span className="text-label-lg">
                                {opt?.label}
                              </span>
                              {isPrimary && (
                                <Badge
                                  variant="primary"
                                  size="sm"
                                  className="py-1! px-3! text-left"
                                >
                                  <Star size={16} aria-hidden="true" />
                                  Especialidad principal
                                </Badge>
                              )}
                            </div>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              {opt?.description}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!isPrimary && (
                            <Button
                              variant="ghost"
                              color="info"
                              size="sm"
                              title="Marcar como principal"
                              aria-label="Marcar como principal"
                              onClick={() =>
                                handleSpecialtySetPrimary(item.specialtyId)
                              }
                            >
                              <Star aria-hidden="true" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            color="error"
                            title="Eliminar especialidad"
                            aria-label="Eliminar especialidad"
                            size="sm"
                            onClick={() =>
                              handleSpecialtyRemove(item.specialtyId)
                            }
                          >
                            <Trash aria-hidden="true" />
                          </Button>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
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

        {/* <section className="mt-6 rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm sm:p-8">
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
                id="correo"
                label="Correo"
                required
                placeholder="dra.jensen@dentalcare.com"
                type="email"
                // validationState="valid"
                // {...register('email')}
                // error={errors.email?.message}
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
                value={[]}
                onChange={() => {}}
              />
              <div className="flex flex-col gap-2 items-center text-center text-body-sm md:flex-row md:text-left text-text-muted rounded-md font-medium p-4">
                <Info size={18} className="text-primary" />
                Seleccione uno o más roles del catálogo. El doctor heredará
                automáticamente todas las capacidades y políticas de seguridad
                asociadas a los roles seleccionados.
              </div>
            </div>
          </div>
        </section> */}
        <div className="flex gap-4 mb-8 mt-6 justify-end">
          <Button
            variant="solid"
            color="error"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Descartar
          </Button>
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
            {isSubmitting ? 'Registrando...' : 'Registrar Doctor'}
          </Button>
        </div>
      </form>
    </>
  );
}
