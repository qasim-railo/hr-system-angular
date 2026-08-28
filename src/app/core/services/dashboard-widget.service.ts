import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DashboardWidgets } from '../models/dashboard-widget.model';

@Injectable({ providedIn: 'root' })
export class DashboardWidgetService {
  private http = inject(HttpClient);
  getWidgets() {
    return this.http.get<DashboardWidgets>(`${environment.apiUrl}/dashboard/widgets`);
  }
}
