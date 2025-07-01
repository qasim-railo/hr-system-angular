export interface FinalSettlementDto {
  employeeId: number;
  settlementDate: string; // ISO string (yyyy-MM-dd)
  leaveEncashment: number;
  gratuityAmount: number;
  deductions: number;
  netPayable: number;
  employeeSigned: boolean;
  hrSigned: boolean;
}

export interface FinalSettlementResponseDto extends FinalSettlementDto {
  id: number;
  employeeName?: string; // optional if backend adds this
}
