export interface Schedule {
  id: string;
  date: string;
  shift: string;
  studentName: string;
  studentEmail: string;
  notes?: string;
}

export interface DutyReport {
  id: string;
  scheduleId: string;
  studentName: string;
  studentEmail: string;
  date: string;
  shift: string;
  report: string;
  images: string[];
  submittedAt: string;
}
