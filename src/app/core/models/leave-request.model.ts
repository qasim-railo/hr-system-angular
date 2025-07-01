export interface LeaveRequestDto {
  employeeId: number;
  startDate: string;  // Format: 'yyyy-MM-dd'
  endDate: string;
  reason: string;
  leaveType: string;
}

export interface LeaveRequestResponseDto {
  id: number;
  employeeId: number;
  employeeName: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  leaveType: string;
}
