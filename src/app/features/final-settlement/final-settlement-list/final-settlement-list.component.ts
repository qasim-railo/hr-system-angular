import { Component, Input, Output, EventEmitter } from '@angular/core';
 import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FinalSettlementResponseDto } from '../../../core/models/final-settlement.model';
import { FinalSettlementService } from '../../../core/services/final-settlement.service';

@Component({
  selector: 'app-final-settlement-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './final-settlement-list.component.html',
  styleUrls: ['./final-settlement-list.component.scss']
})
export class FinalSettlementListComponent {
  @Input() settlements: FinalSettlementResponseDto[] = [];
  @Output() refresh = new EventEmitter<void>();

  displayedColumns = [
    'employeeName',
    'settlementDate',
    'leaveEncashment',
    'gratuityAmount',
    'deductions',
    'netPayable',
    'employeeSigned',
    'hrSigned',
    'actions'
  ];

  constructor(private finalSettlementService: FinalSettlementService) {}

  signOff(id: number): void {
    this.finalSettlementService.signOff(id).subscribe(() => this.refresh.emit());
  }
}
