import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NotificationItem } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationInboxService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/notifications`;
  get() { return this.http.get<NotificationItem[]>(this.url); }
  markRead(id: number) { return this.http.post<void>(`${this.url}/${id}/read`, {}); }
}
