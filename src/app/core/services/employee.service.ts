import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) { }

  // Generic filtered list call
  getList(filter: any) {
    // build params
    const params: any = {};
    if (filter) {
      if (filter.search) params.search = filter.search;
      if (filter.statuses) params.statuses = filter.statuses.join(',');
      if (filter.companyIds) params.companyIds = filter.companyIds.join(',');
      if (filter.departmentIds) params.departmentIds = filter.departmentIds.join(',');
      if (filter.category) params.category = filter.category;
      if (filter.joiningDateFrom) params.joiningDateFrom = filter.joiningDateFrom;
      if (filter.joiningDateTo) params.joiningDateTo = filter.joiningDateTo;
      if (filter.pageNumber) params.pageNumber = filter.pageNumber;
      if (filter.pageSize) params.pageSize = filter.pageSize;
      if (filter.sortBy) params.sortBy = filter.sortBy;
      if (filter.sortDirection) params.sortDirection = filter.sortDirection;
    }

    return this.http.get<any>(this.baseUrl, { params });
  }

  getAll(): Observable<Employee[]> {
      return this.getList({ pageNumber: 1, pageSize: 1000 }).pipe(map((res: any) => res.items));
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  getProfile(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}/profile`);
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee);
  }

  createWithOverride(employee: Employee, overrideReason: string): Observable<Employee> {
    const headers = { 'X-Override': 'true', 'X-Override-Reason': overrideReason };
    return this.http.post<Employee>(this.baseUrl, employee, { headers });
  }

  update(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  duplicateCheck(payload: any) {
    return this.http.post<any>(`${this.baseUrl}/duplicate-check`, payload);
  }
}
