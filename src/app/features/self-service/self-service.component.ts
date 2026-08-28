import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MATERIAL_UI_MODULES } from '../../shared/material-ui.imports';
import { SelfServiceDashboard } from '../../core/models/self-service.model';
import { SelfServiceService } from '../../core/services/self-service.service';

@Component({ standalone: true, selector: 'app-self-service', imports: [CommonModule, ...MATERIAL_UI_MODULES], templateUrl: './self-service.component.html', styleUrl: './self-service.component.scss' })
export class SelfServiceComponent implements OnInit {
  private readonly service = inject(SelfServiceService);
  dashboard?: SelfServiceDashboard; error = '';
  ngOnInit(): void { this.service.getDashboard().subscribe({ next: x => this.dashboard = x, error: e => this.error = e?.error || 'No employee profile is linked to this account.' }); }
}
