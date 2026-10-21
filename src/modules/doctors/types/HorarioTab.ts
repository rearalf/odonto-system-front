export interface HorarioTabProps {
  doctorId: string | number;
}

export type BlockType = 'recurrente' | 'excepcion';

export interface UnifiedBlock {
  id: number;
  startTime: string;
  endTime: string;
  slotDuration?: number;
  maxPatientsPerSlot?: number;
  isRecurring: boolean;
  dayOfWeek?: number;
  specificDate?: string | null;
  reason?: string;
  type: BlockType;
}

export type RowData = UnifiedBlock & { day: string };