import { Shift } from "./shift.model";

export interface EmployeeShift {
  id: number;
  employeeId: number;
  shiftId: number;
  date: string; // "yyyy-MM-dd"
  shift?: Shift; // Optional if backend includes full shift details
}
