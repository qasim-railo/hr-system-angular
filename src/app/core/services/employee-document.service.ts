import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  EmployeeDocument,
  EmployeeDocumentUpload
} from '../models/employee-document.model'; // adjust path as needed
import { environment } from '../../../environments/environment';

export interface FileRecord {
  fileId: number;
  entityType: string;
  entityId: string;
  documentType: string;
  originalFileName: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  updatedAt: string;
  uploadedBy: string;
  version: number;
  status: string;
  isCurrent: boolean;
  isDeleted: boolean;
  deletedAt?: string;
  deletedBy?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeDocumentService {
  private baseUrl = environment.apiUrl+'/EmployeeDocuments';

  constructor(private http: HttpClient) {}

  /**
   * Get all documents for a specific employee
   */
  getByEmployeeId(employeeId: number): Observable<EmployeeDocument[]> {
    return this.http.get<EmployeeDocument[]>(`${this.baseUrl}/${employeeId}`);
  }

  /**
   * Upload a document using FormData
   */
  upload(data: EmployeeDocumentUpload): Observable<any> {
    const formData = new FormData();
    formData.append('employeeId', String(data.employeeId));
    formData.append('fileType', data.fileType);
    formData.append('file', data.file); // must be File object

    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  /**
   * Download document file by ID
   */
  download(documentId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${documentId}`, {
      responseType: 'blob'
    });
  }

  /**
   * Delete document by ID
   */
  delete(documentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${documentId}`);
  }

  searchFiles(filters: { entityType?: string; entityId?: number; search?: string; documentType?: string; status?: string }): Observable<FileRecord[]> {
    const params: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') params[key] = String(value);
    });
    return this.http.get<FileRecord[]>(`${environment.apiUrl}/files`, { params });
  }

  downloadFile(fileId: number): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/files/${fileId}/download`, { responseType: 'blob' });
  }

  deleteFile(fileId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/files/${fileId}`);
  }

  replaceFile(fileId: number, file: File): Observable<FileRecord> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<FileRecord>(`${environment.apiUrl}/files/${fileId}/replace`, formData);
  }

  getVersions(fileId: number): Observable<FileRecord[]> {
    return this.http.get<FileRecord[]>(`${environment.apiUrl}/files/${fileId}/versions`);
  }

  getRecycleBin(): Observable<FileRecord[]> {
    return this.http.get<FileRecord[]>(`${environment.apiUrl}/files/recycle-bin`);
  }

  restoreFile(fileId: number): Observable<FileRecord> {
    return this.http.post<FileRecord>(`${environment.apiUrl}/files/${fileId}/restore`, {});
  }

  purgeFile(fileId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/files/${fileId}/purge`);
  }
}
