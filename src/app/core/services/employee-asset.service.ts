import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeAsset } from '../models/employee-asset.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAssetService {
  private apiUrl = environment.apiUrl+'/EmployeeAssets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<EmployeeAsset[]> {
    return this.http.get<EmployeeAsset[]>(this.apiUrl);
  }

  getById(id: number): Observable<EmployeeAsset> {
    return this.http.get<EmployeeAsset>(`${this.apiUrl}/${id}`);
  }

  create(data: EmployeeAsset): Observable<EmployeeAsset> {
    return this.http.post<EmployeeAsset>(this.apiUrl, data);
  }

  update(id: number, data: EmployeeAsset): Observable<EmployeeAsset> {
    return this.http.put<EmployeeAsset>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
