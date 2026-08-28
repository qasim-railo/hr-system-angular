import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MATERIAL_UI_MODULES } from '../../shared/material-ui.imports';
import { ManagerPortalDashboard } from '../../core/models/manager-portal.model';
import { ManagerPortalService } from '../../core/services/manager-portal.service';

@Component({ standalone: true, selector: 'app-manager-portal', imports: [CommonModule, ...MATERIAL_UI_MODULES], templateUrl: './manager-portal.component.html', styleUrl: './manager-portal.component.scss' })
export class ManagerPortalComponent implements OnInit {
  private readonly service = inject(ManagerPortalService);
  dashboard?: ManagerPortalDashboard; error = '';
  ngOnInit(): void { this.service.getDashboard().subscribe({ next: x => this.dashboard = x, error: e => this.error = e?.error || 'Unable to load manager workspace.' }); }
}
