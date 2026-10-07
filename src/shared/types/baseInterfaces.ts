export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ListParams {
  page?: number;
  perPage?: number;
  search?: string;
  pagination?: boolean;
}
