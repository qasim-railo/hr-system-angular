import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GratuityReportDto } from '../models/gratuity-report.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GratuityReportService {
  private apiUrl = '/api/gratuityreport';

  constructor(private http: HttpClient) {}

  getByEmployeeId(employeeId: number): Observable<GratuityReportDto> {
    return this.http.get<GratuityReportDto>(`${this.apiUrl}/${employeeId}`);
  }
}
