// src/app/features/departments/services/department.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Department } from '../../../core/models/department.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl = environment.apiUrl + '/Departments'; // Replace with actual backend URL

  constructor(private http: HttpClient) { }

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  getById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }
  getDepartmentsByCompanyId(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/by-company/${id}`);
  }


  create(dept: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, dept);
  }

  update(id: number, dept: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/${id}`, dept);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
