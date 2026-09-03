export interface Shift {
  id: number;
  name: string;
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
  breakMinutes: number;
  workingDays: string;
  effectiveFrom: string;
  effectiveTo?: string;
  type: string;      // e.g., "Staff", "Labor"
}
