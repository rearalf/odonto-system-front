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

export interface SistemaAnatomico {
  id: string;
  nombre: string;
  icono: LucideIcon;
}

export const SISTEMAS_ANATOMICOS: SistemaAnatomico[] = [
  { id: 'nervioso', nombre: 'S. Nervioso Central', icono: Brain },
  { id: 'cardiovascular', nombre: 'S. Cardiovascular', icono: HeartPulse },
  { id: 'endocrino', nombre: 'S. Endocrino', icono: RefreshCw },
  {
    id: 'musculoesqueletico',
    nombre: 'S. Musculoesquelético',
    icono: PersonStanding,
  },
  { id: 'respiratorio', nombre: 'S. Respiratorio', icono: Wind },
  { id: 'urinario', nombre: 'S. Urinario', icono: Droplets },
  { id: 'genitourinario', nombre: 'S. Genitourinario', icono: ShieldPlus },
  { id: 'gastrointestinal', nombre: 'S. Gastrointestinal', icono: Soup },
];