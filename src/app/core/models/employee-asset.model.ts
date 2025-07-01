export interface EmployeeAsset {
  id: number;
  employeeId: number;
  assetId: number;
  assignedDate: string;    // Use string for easier binding with input[type="date"]
  returnedDate?: string;   // Optional
  status: string;          // "Assigned", "Returned", "Lost", etc.
}
