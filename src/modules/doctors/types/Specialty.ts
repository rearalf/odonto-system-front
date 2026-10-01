export type Specialty = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type SpecialtyListParams = {
  page?: number;
  perPage?: number;
  search?: string;
  pagination?: boolean;
};
