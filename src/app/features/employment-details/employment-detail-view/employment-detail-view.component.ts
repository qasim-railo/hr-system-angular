 
  import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmploymentDetail } from '../../../core/models/employment-detail.model';
import { EmploymentDetailService } from '../../../core/services/employment-detail.service';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
 
@Component({ 
  standalone: true,
  imports: [MATERIAL_UI_MODULES], 
  selector: 'app-employment-detail-view',
  templateUrl: './employment-detail-view.component.html'
})
export class EmploymentDetailViewComponent implements OnInit {
  detail!: EmploymentDetail | null;
  employeeId!: number;

  constructor(
    private route: ActivatedRoute,
    private service: EmploymentDetailService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeId = +id;
      this.service.getByEmployeeId(this.employeeId).subscribe({
        next: data => this.detail = data,
        error: () => this.detail = null
      });
    }
  }
}
