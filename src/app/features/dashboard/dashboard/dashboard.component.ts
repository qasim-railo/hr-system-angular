import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee.service';
import { LeaveRequestService } from '../../../core/services/leave-request.service';
import { IncrementHistoryService } from '../../../core/services/increment-history.service';

import { DepartmentService } from '../../departments/services/department.service';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';

import { NgChartsModule } from 'ng2-charts';
import { PayrollService } from '../../../core/services/payroll.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MATERIAL_UI_MODULES, NgChartsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  employeesCount = 0;
  departmentsCount = 0;
  pendingLeaves = 0;
  payrollsCount = 0;

  recentIncrements: any[] = [];
  upcomingLeaves: any[] = [];

  departmentChartData: any;
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private leaveRequestService: LeaveRequestService,
    private payrollService: PayrollService,
    private incrementService: IncrementHistoryService
  ) { }

  ngOnInit(): void {
    this.loadStats();
    this.loadDepartmentWiseChart();
    this.loadRecentIncrements();
    this.loadUpcomingLeaves();
  }

  loadStats() {
    this.employeeService.getAll().subscribe(data => {
      this.employeesCount = data.length;
    });

    this.departmentService.getAll().subscribe(data => {
      this.departmentsCount = data.length;
    });

    this.leaveRequestService.getAll().subscribe(data => {
      this.pendingLeaves = data.filter((l: any) => l.status === 'Pending').length;
    });

    this.payrollService.getPayrolls(2025, 7).subscribe(data => {
      this.payrollsCount = data.length;
    });
  }

  loadRecentIncrements() {
    this.incrementService.getAll().subscribe(data => {
      this.recentIncrements = data.slice(-5).reverse(); // last 5
    });
  }

  loadUpcomingLeaves() {
    this.leaveRequestService.getAll().subscribe(data => {
      const today = new Date();
      this.upcomingLeaves = data.filter((l: any) =>
        new Date(l.startDate) > today && l.status === 'Approved'
      ).slice(0, 5);
    });
  }

  loadDepartmentWiseChart() {
    this.employeeService.getAll().subscribe(employees => {
      this.departmentService.getAll().subscribe(departments => {
        const deptMap: { [key: string]: number } = {};

        employees.forEach(emp => {
          const dept = departments.find((d: any) => d.id === emp.departmentId);
          const deptName = dept ? dept.name : 'Unknown';
          deptMap[deptName] = (deptMap[deptName] || 0) + 1;
        });

        this.departmentChartData = {
          labels: Object.keys(deptMap),
          datasets: [
            {
              data: Object.values(deptMap),
              backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350', '#AB47BC']
            }
          ]
        };
      });
    });
  }
}