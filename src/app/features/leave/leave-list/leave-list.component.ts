import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { LeaveRequestResponseDto } from '../../../core/models/leave-request.model';
import { LeaveRequestService } from '../../../core/services/leave-request.service';

@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [...MATERIAL_UI_MODULES],
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.scss']
})
export class LeaveListComponent {
  @Input() leaves: LeaveRequestResponseDto[] = [];
  @Output() refresh = new EventEmitter<void>();

  displayedColumns: string[] = ['employee', 'type', 'dates', 'reason', 'status', 'actions'];

  constructor(private leaveService: LeaveRequestService) {}

  approve(id: number): void {
    this.leaveService.approve(id).subscribe(() => this.refresh.emit());
  }

  reject(id: number): void {
    this.leaveService.reject(id).subscribe(() => this.refresh.emit());
  }
}
