import { ToothIcon } from '@/shared/components/ui';
import { Badge } from '@/shared/components/ui';

export default function OdontogramaTab() {
  return (
    <div className="rounded-xl bg-bg-surface border border-border-default shadow-sm p-6 mt-6 text-center text-text-muted">
      <ToothIcon className="h-12 w-12 mx-auto text-text-muted/50 mb-4" aria-hidden="true" />
      <p className="text-body-lg font-medium">Odontograma Dental</p>
      <p className="text-body-sm mt-1">Próximamente</p>
      <Badge variant="default" className="mt-4 inline-flex">
        En desarrollo
      </Badge>
    </div>
  );
}