import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../models/asset.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private baseUrl = environment.apiUrl + '/assets';

  constructor(private http: HttpClient) { }

  // Get all assets
  getAll(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.baseUrl);
  }

  // Get asset by ID
  getById(id: number): Observable<Asset> {
    return this.http.get<Asset>(`${this.baseUrl}/${id}`);
  }

  // Create asset
  create(asset: Asset): Observable<Asset> {
    return this.http.post<Asset>(this.baseUrl, asset);
  }

  // Update asset
  update(id: number, asset: Asset): Observable<Asset> {
    return this.http.put<Asset>(`${this.baseUrl}/${id}`, asset);
  }

  // Delete asset
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
