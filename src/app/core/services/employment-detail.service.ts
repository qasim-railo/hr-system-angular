import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmploymentDetail } from '../models/employment-detail.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmploymentDetailService {
  private apiUrl = environment.apiUrl + '/employeedetails';
  
  constructor(private http: HttpClient) {}

  getByEmployeeId(employeeId: number): Observable<EmploymentDetail> {
    return this.http.get<EmploymentDetail>(`${this.apiUrl}/employee/${employeeId}`);
  }

  getById(id: number): Observable<EmploymentDetail> {
    return this.http.get<EmploymentDetail>(`${this.apiUrl}/${id}`);
  }

  create(detail: EmploymentDetail): Observable<EmploymentDetail> {
    return this.http.post<EmploymentDetail>(this.apiUrl, detail);
  }

  update(id: number, detail: EmploymentDetail): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, detail);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}