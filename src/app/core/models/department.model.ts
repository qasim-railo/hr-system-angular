// src/app/core/models/department.model.ts
export interface Department {
  departmentId?: number;              // Optional, usually auto-generated
  name: string;
  description: string;
  companyId: number;
  companyName?: string;     // Optional, used only in lists/view
}