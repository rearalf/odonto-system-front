export type RadiographType =
  | 'periapical'
  | 'panoramic'
  | 'bitewing'
  | 'occlusal'
  | 'cephalometric'
  | 'cbct';

export type Radiographs = Record<RadiographType, boolean>;

export type RadiographyReportFormValues = {
  fullName: string;
  birthDate: string;
  phone: string;
  periapical: boolean;
  panoramic: boolean;
  bitewing: boolean;
  occlusal: boolean;
  cephalometric: boolean;
  cbct: boolean;
};

export type RadiographyReportPayload = {
  fullName: string;
  age: number;
  phone: string;
  radiographs: Radiographs;
};
