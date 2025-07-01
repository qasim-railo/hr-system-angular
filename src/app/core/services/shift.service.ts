import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shift } from '../models/shift.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ShiftService {
  private baseUrl = environment.apiUrl+'/shift';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Shift[]> {
    return this.http.get<Shift[]>(this.baseUrl);
  }

  getById(id: number): Observable<Shift> {
    return this.http.get<Shift>(`${this.baseUrl}/${id}`);
  }

  create(shift: Shift): Observable<Shift> {
    return this.http.post<Shift>(this.baseUrl, shift);
  }

  update(id: number, shift: Shift): Observable<Shift> {
    return this.http.put<Shift>(`${this.baseUrl}/${id}`, shift);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
