'use no memo';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { CheckboxField, Modal } from '@/shared/components/ui';
import { useRadiographyReportCreate } from '@/modules/radiography-reports/hooks/useRadiographyReportCreate';

import InputField from '@/shared/components/ui/form/InputField';
import MaskedInputField from '@/shared/components/ui/form/MaskedInputField';
import DatePickerField from '@/shared/components/ui/form/DatePickerField';
import FieldHelp from '@/shared/components/ui/form/FieldHelp';
import Button from '@/shared/components/ui/button';
import { User, Phone, Calendar, Download } from 'lucide-react';
import { RADIOGRAPH_OPTIONS } from '../constants';

function RadiographyReportPage() {
  const {
    control,
    errors,
    isSubmitting,
    onSubmit,
    age,
    maxBirthDate,
    allSelected,
    someSelected,
    toggleAllRadiographs,
    handleCancel,
    pdfUrl,
  } = useRadiographyReportCreate();

  const [modalOpen, setModalOpen] = useState(false);

  const radiographsGroupError = (errors as Record<string, { message?: string }>)
    .radiographs?.message;

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'reporte-radiografias.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1 className="mt-4 text-headline-lg font-bold text-text-primary">
        Generar reporte de radiografías
      </h1>
      <p className="mt-1 text-body-md text-text-muted">
        Completa los datos del paciente y selecciona los tipos de radiografía
        para generar el reporte en PDF.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-6 max-w-3xl" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <InputField
                  id="fullName"
                  label="Nombre completo"
                  required
                  leftIcon={User}
                  placeholder="Ej. López Pérez"
                  error={errors.fullName?.message}
                  {...field}
                />
              )}
            />
          </div>

          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DatePickerField
                id="birthDate"
                label="Fecha de nacimiento"
                leftIcon={Calendar}
                required
                help={
                  age !== null && age >= 0
                    ? `Edad calculada: ${age} ${age === 1 ? 'año' : 'años'}`
                    : undefined
                }
                error={errors.birthDate?.message}
                maxDate={maxBirthDate}
                dateFormat="DD/MM/YYYY"
                {...field}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <MaskedInputField
                id="phone"
                label="Teléfono"
                placeholder="0000 0000"
                required
                leftIcon={Phone}
                mask="0000 0000"
                unmask
                value={field.value}
                onAccept={field.onChange}
                error={errors.phone?.message}
              />
            )}
          />
        </div>

        <fieldset className="border border-border-default rounded-xl bg-bg-surface p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <legend className="text-label-md font-semibold text-text-primary">
              Tipos de radiografía <span className="text-error">*</span>
            </legend>

            <CheckboxField
              size="sm"
              label="Seleccionar todas"
              checked={allSelected}
              indeterminate={someSelected}
              onChange={toggleAllRadiographs}
              className="w-auto"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {RADIOGRAPH_OPTIONS.map(({ key, label, description }) => (
              <Controller
                key={key}
                name={key}
                control={control}
                render={({ field }) => (
                  <CheckboxField
                    id={key}
                    variant="card"
                    size="sm"
                    label={label}
                    description={description}
                    checked={Boolean(field.value)}
                    onChange={field.onChange}
                    error={errors[key as keyof typeof errors]?.message}
                  />
                )}
              />
            ))}
          </div>

          <FieldHelp error={radiographsGroupError} />
        </fieldset>

        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            color="primary"
            size="md"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Generando PDF…' : 'Generar PDF'}
          </Button>
          <Button
            type="button"
            variant="outline"
            color="primary"
            size="md"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Limpiar
          </Button>
        </div>
      </form>

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Vista previa del reporte"
        description="Revisa el PDF generado antes de descargarlo."
        size="xxxl"
      >
        <div className="w-full h-150 border border-border-default rounded-lg bg-white dark:bg-bg-surface">
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              title="Vista previa del reporte de radiografías"
              className="w-full h-full"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full items-center justify-center text-text-muted">
              No hay reporte disponible.
            </div>
          )}
        </div>
      </Modal>

      {pdfUrl && (
        <div className="mt-4 flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            color="primary"
            size="md"
            onClick={() => setModalOpen(true)}
            disabled={isSubmitting}
          >
            <Download className="w-4 h-4 mr-2" aria-hidden="true" />
            Vista previa y descarga
          </Button>
          <Button
            type="button"
            variant="outline"
            color="primary"
            size="md"
            onClick={handleDownload}
            disabled={isSubmitting || !pdfUrl}
          >
            Descargar PDF
          </Button>
        </div>
      )}
    </div>
  );
}

export default RadiographyReportPage;
