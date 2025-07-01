import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayrollDto } from '../models/payroll.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private apiUrl = `${environment.apiUrl}/payrolls`;

  constructor(private http: HttpClient) {}

  // GET: Generate (or load existing) payrolls for the month
  getPayrolls(year: number, month: number): Observable<PayrollDto[]> {
    return this.http.get<PayrollDto[]>(`${this.apiUrl}/generate/${year}/${month}`);
  }

  // POST: Approve payroll
  approvePayroll(payrollId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/approve/${payrollId}`, {});
  }

  // GET: Download payslip (PDF)
  getPayslip(payrollId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/payslip/${payrollId}`, { responseType: 'blob' });
  }

  // GET: Export full payroll for a month (Excel or PDF based on backend)
  exportPayroll(year: number, month: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/${year}/${month}`, { responseType: 'blob' });
  }
}
