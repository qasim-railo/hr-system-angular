import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuditLog } from '../../core/models/audit.model';
import { AuditService } from '../../core/services/audit.service';

@Component({
  standalone: true,
  selector: 'app-audit',
  imports: [CommonModule],
  templateUrl: './audit.component.html'
})
export class AuditComponent implements OnInit {
  logs: AuditLog[] = [];
  error = '';
  constructor(private audit: AuditService) {}
  ngOnInit(): void {
    this.audit.get().subscribe({ next: logs => this.logs = logs, error: error => this.error = error?.error?.message || 'Unable to load audit log.' });
  }
}
