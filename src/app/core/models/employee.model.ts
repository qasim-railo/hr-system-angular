
export interface Employee {
  employeeId?: number; 
  companyId: number;
  departmentId:number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO string format (e.g., '1990-01-01')
  gender?: string;
  nationality?: string;
  motherName?: string;
  homeCountryAddress?: string;
  homeCountryPhone?: string;
  emergencyContactName?: string;
  emergencyPhone?: string;
  email: string;
  passportNumber: string;
  passportExpiry?: string; // optional if not collected initially
  passportCountry?: string;
  photoPath?: string;
}

