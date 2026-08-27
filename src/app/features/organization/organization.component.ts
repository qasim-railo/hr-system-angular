import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MATERIAL_UI_MODULES } from '../../shared/material-ui.imports';
import { environment } from '../../../environments/environment';

interface OrganizationUnit {
  id: number; name: string; code?: string; description?: string; parentId?: number;
  companyId?: number; companyIdLegacy?: number; departmentId?: number; departmentIdLegacy?: number; isActive: boolean; employeeCount: number; childCount: number;
}

@Component({
  standalone: true,
  selector: 'app-organization',
  imports: [CommonModule, FormsModule, ...MATERIAL_UI_MODULES],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent implements OnInit {
  types = ['branches', 'sections', 'teams', 'positions'];
  selectedType = 'branches';
  units: OrganizationUnit[] = [];
  companies: OrganizationUnit[] = [];
  departments: OrganizationUnit[] = [];
  parents: OrganizationUnit[] = [];
  editing?: OrganizationUnit;
  form = { name: '', code: '', description: '', parentId: undefined as number | undefined, companyId: undefined as number | undefined, departmentId: undefined as number | undefined, isActive: true };
  message = '';
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void { this.loadReferenceData(); this.load(); }
  loadReferenceData(): void {
    this.http.get<any[]>(`${environment.apiUrl}/companies`).subscribe(data => this.companies = data.map(item => ({ ...item, id: item.id ?? item.companyId })));
    this.http.get<any[]>(`${environment.apiUrl}/departments`).subscribe(data => this.departments = data.map(item => ({ ...item, id: item.id ?? item.departmentId })));
  }
  load(): void {
    this.http.get<OrganizationUnit[]>(`${environment.apiUrl}/organization/${this.selectedType}`).subscribe({
      next: data => { this.units = data; this.loadParents(); },
      error: err => this.showError(err)
    });
  }
  selectType(type: string): void { this.selectedType = type; this.reset(); this.load(); }
  loadParents(): void {
    const type = this.selectedType === 'sections' ? 'departments' : this.selectedType === 'teams' ? 'sections' : this.selectedType === 'positions' ? 'teams' : '';
    if (type) {
      const endpoint = type === 'departments' ? `${environment.apiUrl}/departments` : `${environment.apiUrl}/organization/${type}`;
      this.http.get<any[]>(endpoint).subscribe(data => this.parents = data.map(item => ({ ...item, id: item.id ?? item.departmentId ?? item.sectionId ?? item.teamId })));
    }
    else this.parents = [];
  }
  edit(unit: OrganizationUnit): void {
    this.editing = unit;
    this.form = { name: unit.name, code: unit.code || '', description: unit.description || '', parentId: unit.parentId, companyId: unit.companyId, departmentId: unit.departmentId, isActive: unit.isActive };
  }
  save(): void {
    if (!this.form.name.trim()) { this.error = 'Name is required.'; return; }
    const url = `${environment.apiUrl}/organization/${this.selectedType}${this.editing ? '/' + this.editing.id : ''}`;
    const request = this.editing ? this.http.put(url, this.form) : this.http.post(url, this.form);
    request.subscribe({ next: () => { this.message = `${this.selectedType.slice(0, -1)} saved.`; this.reset(); this.load(); }, error: err => this.showError(err) });
  }
  archive(unit: OrganizationUnit): void {
    this.http.post(`${environment.apiUrl}/organization/${this.selectedType}/${unit.id}/archive`, {}).subscribe({
      next: () => { this.message = 'Organizational unit archived.'; this.load(); }, error: err => this.showError(err)
    });
  }
  remove(unit: OrganizationUnit): void {
    this.http.get<{ canDelete: boolean; reason?: string }>(`${environment.apiUrl}/organization/${this.selectedType}/${unit.id}/delete-check`).subscribe({
      next: check => check.canDelete ? this.http.delete(`${environment.apiUrl}/organization/${this.selectedType}/${unit.id}`).subscribe({ next: () => this.load(), error: err => this.showError(err) }) : this.error = check.reason || 'Reassign references before deleting.',
      error: err => this.showError(err)
    });
  }
  reset(): void { this.editing = undefined; this.form = { name: '', code: '', description: '', parentId: undefined, companyId: undefined, departmentId: undefined, isActive: true }; }
  private showError(err: any): void { this.error = err?.error?.message || err?.error || 'Unable to save organization data.'; }
}
