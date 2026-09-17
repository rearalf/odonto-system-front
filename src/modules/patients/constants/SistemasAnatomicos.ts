import type { LucideIcon } from 'lucide-react';
import {
  Brain,
  Droplets,
  HeartPulse,
  PersonStanding,
  RefreshCw,
  ShieldPlus,
  Soup,
  Wind,
} from 'lucide-react';

export type PatientSystemDtoKey =
  | 'hasSncIssues'
  | 'hasSvcIssues'
  | 'hasSeIssues'
  | 'hasSmeIssues'
  | 'hasSrIssues'
  | 'hasSuIssues'
  | 'hasSguIssues'
  | 'hasSgiIssues';

export interface SistemaAnatomico {
  id: string;
  nombre: string;
  icono: LucideIcon;
  dtoKey: PatientSystemDtoKey;
}

export const SISTEMAS_ANATOMICOS: SistemaAnatomico[] = [
  { id: 'nervioso', nombre: 'S. Nervioso Central', icono: Brain, dtoKey: 'hasSncIssues' },
  { id: 'cardiovascular', nombre: 'S. Cardiovascular', icono: HeartPulse, dtoKey: 'hasSvcIssues' },
  { id: 'endocrino', nombre: 'S. Endocrino', icono: RefreshCw, dtoKey: 'hasSeIssues' },
  {
    id: 'musculoesqueletico',
    nombre: 'S. Musculoesquelético',
    icono: PersonStanding,
    dtoKey: 'hasSmeIssues',
  },
  { id: 'respiratorio', nombre: 'S. Respiratorio', icono: Wind, dtoKey: 'hasSrIssues' },
  { id: 'urinario', nombre: 'S. Urinario', icono: Droplets, dtoKey: 'hasSuIssues' },
  { id: 'genitourinario', nombre: 'S. Genitourinario', icono: ShieldPlus, dtoKey: 'hasSguIssues' },
  { id: 'gastrointestinal', nombre: 'S. Gastrointestinal', icono: Soup, dtoKey: 'hasSgiIssues' },
];