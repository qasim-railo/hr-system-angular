export interface EmployeeDocumentUpload {
  employeeId: number;
  file: File;              // File selected via input[type="file"]
  fileType: string;        // e.g. "Passport", "Visa", "Contract"
}

export interface EmployeeDocument {
  id: number;
  employeeId: number;
  fileName: string;
  filePath: string;
  uploadedAt: string;      // Keep as string to display formatted date
  fileType: string;
}
