export interface PayrollDto {
  id: number;
  employeeId: number;
  month: string; // ISO string format e.g., '2025-06-01'
  basicSalary: number;
  ot1Amount: number;
  ot2Amount: number;
  deductions: number;
  netSalary: number;
  isApproved: boolean;
}

export interface PayrollCreateDto {
  employeeId: number;
  month: string; // ISO string
}
