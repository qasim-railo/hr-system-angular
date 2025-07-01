import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Attendance } from '../models/attendance.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private baseUrl = `${environment.apiUrl}/attendance`;

  constructor(private http: HttpClient) {}

  // Get attendance by employee ID
  getByEmployee(employeeId: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.baseUrl}/employee/${employeeId}`);
  }

  // Create single attendance entry
  create(attendance: Attendance): Observable<void> {
    return this.http.post<void>(this.baseUrl, attendance);
  }

  // Import via Excel (will define when component is created)
  importExcel(formData: FormData): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/import`, formData);
  }
}
