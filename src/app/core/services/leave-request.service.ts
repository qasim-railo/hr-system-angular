import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeaveRequestDto } from '../models/leave-request.model';
import { LeaveRequestResponseDto } from '../models/leave-request.model';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  private apiUrl = environment.apiUrl + '/leaverequest';

  constructor(private http: HttpClient) { }

  // Get all leave requests
  getAll(): Observable<LeaveRequestResponseDto[]> {
    return this.http.get<LeaveRequestResponseDto[]>(this.apiUrl);
  }

  // Get one leave request by ID
  getById(id: number): Observable<LeaveRequestResponseDto> {
    return this.http.get<LeaveRequestResponseDto>(`${this.apiUrl}/${id}`);
  }

  // Create a new leave request
  create(request: LeaveRequestDto): Observable<void> {
    return this.http.post<void>(this.apiUrl, request);
  }

  // Approve a leave request
  approve(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/approve`, {});
  }

  // Reject a leave request
  reject(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/reject`, {});
  }
}
