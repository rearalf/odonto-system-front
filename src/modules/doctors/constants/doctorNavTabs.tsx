import {
  Award,
  CalendarClock,
  History,
  NotepadText,
  ShieldCheck,
} from 'lucide-react';

export const DoctorNavTabsOptions = [
  {
    key: 'informacion-general',
    label: 'Información General y Filiación',
    icon: <NotepadText />,
  },
  {
    key: 'especialidades-acreditaciones',
    label: 'Especialidades y Acreditaciones',
    icon: <Award />,
  },
  {
    key: 'cuenta-acceso',
    label: 'Cuenta de Acceso y Roles RBAC',
    icon: <ShieldCheck />,
  },
  {
    key: 'agenda-boxes',
    label: 'Agenda y Boxes Asignados',
    icon: <CalendarClock />,
  },
  {
    key: 'auditoria-trazabilidad',
    label: 'Auditoría y Trazabilidad',
    icon: <History />,
  },
] as const;

export type DoctorDetailTab = (typeof DoctorNavTabsOptions)[number]['key'];
