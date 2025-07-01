import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IncrementHistory } from '../models/increment-history.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IncrementHistoryService {
  private apiUrl = environment.apiUrl+'/incrementhistory';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IncrementHistory[]> {
    return this.http.get<IncrementHistory[]>(this.apiUrl);
  }

  getByEmployee(employeeId: number): Observable<IncrementHistory[]> {
    return this.http.get<IncrementHistory[]>(`${this.apiUrl}/employee/${employeeId}`);
  }

  create(data: IncrementHistory): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
