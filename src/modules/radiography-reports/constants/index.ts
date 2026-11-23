import type { RadiographType } from '../types/RadiographyReport';

export const RADIOGRAPH_OPTIONS: ReadonlyArray<{
  key: RadiographType;
  label: string;
  description: string;
}> = [
  {
    key: 'periapical',
    label: 'Periapical',
    description: 'Diente completo y raíz',
  },
  {
    key: 'panoramic',
    label: 'Panorámica',
    description: 'Vista general maxilar',
  },
  {
    key: 'bitewing',
    label: 'Bitewing',
    description: 'Coronas y caries interproximales',
  },
  {
    key: 'occlusal',
    label: 'Oclusal',
    description: 'Arcada superior o inferior',
  },
  {
    key: 'cephalometric',
    label: 'Cefalométrica',
    description: 'Perfil craneofacial',
  },
  { key: 'cbct', label: 'CBCT', description: 'Tomografía 3D' },
];
