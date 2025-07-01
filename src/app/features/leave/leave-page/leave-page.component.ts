import { Component, OnInit } from '@angular/core';
import { LeaveRequestResponseDto } from '../../../core/models/leave-request.model';
import { LeaveRequestService } from '../../../core/services/leave-request.service';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { LeaveListComponent } from '../leave-list/leave-list.component';
 
@Component({
  selector: 'app-leave-page',
  standalone: true,
  templateUrl: './leave-page.component.html',
  styleUrls: ['./leave-page.component.scss'],
  imports: [...MATERIAL_UI_MODULES,LeaveListComponent]
})
export class LeavePageComponent implements OnInit {
  leaveRequests: LeaveRequestResponseDto[] = [];

  constructor(private leaveService: LeaveRequestService) {}

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  loadLeaveRequests(): void {
    this.leaveService.getAll().subscribe({
      next: data => this.leaveRequests = data,
      error: err => console.error('Failed to fetch leave requests', err)
    });
  }

  onRefresh(): void {
    this.loadLeaveRequests();
  }
}
