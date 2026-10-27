import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import {
  Button,
  InputField,
  Modal,
  TextAreaField,
} from '@/shared/components/ui';
import type { UnavailabilityModalInfoProps } from '../../types/Unavailability';

const UnavailabilityModalInfo = ({
  data,
  isOpen,
  onClose,
}: UnavailabilityModalInfoProps) => {
  if (!data) return null;

  const formatDateTime = (isoString: string) => {
    return format(new Date(isoString), 'dd/MM/yyyy HH:mm', { locale: es });
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={onClose}
      title="Excepción"
      description="Detalle de la excepción (vacaciones, ausencia, etc.)"
      size="lg"
      footer={
        <>
          <Button
            type="submit"
            variant="solid"
            color="primary"
            onClick={onClose}
          >
            Salir
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            disabled
            aria-label={formatDateTime(data.startTime)}
            label="Fecha y hora de inicio"
            value={formatDateTime(data.startTime)}
          />
          <InputField
            disabled
            aria-label={formatDateTime(data.endTime)}
            label="Fecha y hora de fin"
            value={formatDateTime(data.endTime)}
          />

          <div className="sm:col-span-2">
            <TextAreaField
              disabled
              label="Motivo"
              value={data.reason}
              aria-label={data.reason}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UnavailabilityModalInfo;
