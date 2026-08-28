import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EmployeeReport } from '../models/report.model';
import { environment } from '../../../environments/environment';

export interface ReportFilters {
  companyId?: number;
  branchId?: number;
  departmentId?: number;
  employeeId?: number;
  status?: string;
  fromDate?: string;
  toDate?: string;
}

@Injectable({ providedIn: 'root' })
export class ReportService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/reports`;

  getEmployees(filters: ReportFilters) {
    return this.http.get<EmployeeReport[]>(`${this.url}/employees`, { params: this.params(filters) });
  }

  exportEmployees(filters: ReportFilters) {
    return this.http.get(`${this.url}/employees/export`, {
      params: this.params(filters),
      responseType: 'blob'
    });
  }

  private params(filters: ReportFilters) {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') params = params.set(key, value.toString());
    });
    return params;
  }
}
