export interface IncrementHistory {
  id: number;
  employeeId: number;
  incrementDate: string;
  oldSalary: number;
  newSalary: number;
  reason: string;
  approvedBy: string;
  employee?: {
    firstName: string;
    lastName: string;
  };
}
