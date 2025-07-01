import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeShift } from '../models/employee-shift.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EmployeeShiftService {
  private baseUrl = environment.apiUrl+'/employeeshift';

  constructor(private http: HttpClient) {}

  getAll(): Observable<EmployeeShift[]> {
    return this.http.get<EmployeeShift[]>(this.baseUrl);
  }

  getById(id: number): Observable<EmployeeShift> {
    return this.http.get<EmployeeShift>(`${this.baseUrl}/${id}`);
  }

  create(data: EmployeeShift): Observable<EmployeeShift> {
    return this.http.post<EmployeeShift>(this.baseUrl, data);
  }

  update(id: number, data: EmployeeShift): Observable<EmployeeShift> {
    return this.http.put<EmployeeShift>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
