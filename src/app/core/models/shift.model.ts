export interface Shift {
  id: number;
  name: string;
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
  type: string;      // e.g., "Staff", "Labor"
}
