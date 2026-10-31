import type { DoctorListItem } from '@/modules/doctors/types/Doctor';

export type UseDoctorSearchAndSlotsProps = {
  doctorId: number | null;
  date: string;
  isWalkIn: boolean;
  startTime: string;
  duration: number;
  endTime: string;
  slot: { startTime: string; endTime: string } | null;
  onDoctorChange: (id: number | null) => void;
  onDateChange: (date: string) => void;
  onStartTimeChange: (time: string) => void;
  onDurationChange: (minutes: number) => void;
  onSlotSelect: (slot: { startTime: string; endTime: string } | null) => void;
};

export type SelectDoctorSectionProps = {
  doctorId: number | null;
  date: string;
  startTime: string;
  duration: number;
  slot: { startTime: string; endTime: string } | null;
  isWalkIn: boolean;
  endTime: string;
  selectedDoctor: DoctorListItem | undefined;
  onDoctorChange: (id: number | null) => void;
  onDateChange: (date: string) => void;
  onStartTimeChange: (time: string) => void;
  onDurationChange: (minutes: number) => void;
  onSlotSelect: (slot: { startTime: string; endTime: string } | null) => void;
  doctorError?: string;
  dateError?: string;
  slotError?: string;
};