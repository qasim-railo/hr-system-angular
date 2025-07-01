import { Component, OnInit } from '@angular/core';
 import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { FinalSettlementResponseDto } from '../../../core/models/final-settlement.model';
import { FinalSettlementService } from '../../../core/services/final-settlement.service';
import { FinalSettlementListComponent } from '../final-settlement-list/final-settlement-list.component';

@Component({
  selector: 'app-final-settlement-page',
  standalone: true,
  imports: [...MATERIAL_UI_MODULES,FinalSettlementListComponent],
  templateUrl: './final-settlement-page.component.html',
  styleUrls: ['./final-settlement-page.component.scss']
})
export class FinalSettlementPageComponent implements OnInit {
  settlements: FinalSettlementResponseDto[] = [];
  loading = false;

  constructor(
    private finalSettlementService: FinalSettlementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSettlements();
  }

  loadSettlements(): void {
    this.loading = true;
    this.finalSettlementService.getAll().subscribe({
      next: data => {
        this.settlements = data;
        this.loading = false;
      },
      error: err => {
        console.error('Error loading settlements', err);
        this.loading = false;
      }
    });
  }

  navigateToGenerate(): void {
    this.router.navigate(['/final-settlement/generate']);
  }
}
