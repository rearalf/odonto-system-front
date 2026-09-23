import {
  Banknote,
  NotepadText,
  CalendarClock,
  FolderSymlink,
} from 'lucide-react';

import { Button, ToothIcon } from '@/shared/components/ui';
import { scrollStyles } from '@/shared/utils/scroll';

import { PatientNavTabsOptions } from '../constants/PatientNavTab';
import type { PatientNavTab } from '../types/PatientDetail';

const PatientNavTabs = ({
  activeTab,
  onTabChange,
}: {
  activeTab: PatientNavTab;
  onTabChange: (tab: PatientNavTab) => void;
}) => {
  return (
    <section
      className={scrollStyles.thin + ' flex items-center gap-3 mt-6 py-3 px-2'}
      role="tablist"
      aria-label="Secciones del paciente"
    >
      {PatientNavTabsOptions.map((tab) => (
        <Button
          key={tab.key}
          size="sm"
          variant={activeTab === tab.key ? 'solid' : 'ghost'}
          className="whitespace-nowrap"
          role="tab"
          aria-selected={activeTab === tab.key}
          onClick={() => onTabChange(tab.key as PatientNavTab)}
          icon={
            tab.key === 'ficha-general' ? (
              <NotepadText />
            ) : tab.key === 'odontograma' ? (
              <ToothIcon />
            ) : tab.key === 'historial-citas' ? (
              <CalendarClock />
            ) : tab.key === 'presupuestos-pagos' ? (
              <Banknote />
            ) : (
              <FolderSymlink />
            )
          }
        >
          {tab.label}
        </Button>
      ))}
    </section>
  );
};

export default PatientNavTabs;
