export interface Attendance {
  employeeId: number;
  date: string; // Format: YYYY-MM-DD
  checkIn: string; // Format: HH:mm:ss
  checkOut: string; // Format: HH:mm:ss
  ot1: number;
  ot2: number;
}