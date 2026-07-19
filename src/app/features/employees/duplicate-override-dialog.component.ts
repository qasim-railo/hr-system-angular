import { Component, Inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-duplicate-override-dialog',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, MatDialogModule, MatListModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Potential Duplicate Employees</h2>
    <mat-dialog-content>
      <p *ngIf="data.matches?.length === 0">No matching employees were found.</p>

      <div *ngFor="let c of data.matches">
        <mat-list>
          <mat-list-item>
            <div class="w-100">
              <div>
                <strong>{{ c.firstName }} {{ c.lastName }}</strong> — {{ c.companyName || 'Unknown company' }}
              </div>
              <div>
                <small>Matched fields: {{ c.matchedFields?.join(', ') }}</small>
              </div>
              <div *ngIf="c.passportNumber">
                <small>Passport: {{ maskSensitive(c.passportNumber) }}</small>
              </div>
              <div *ngIf="c.nationalId">
                <small>National ID: {{ maskSensitive(c.nationalId) }}</small>
              </div>
            </div>
            <button mat-button color="primary" (click)="openExisting(c.employeeId)">Open</button>
          </mat-list-item>
        </mat-list>
      </div>

      <mat-form-field appearance="fill" *ngIf="data.canOverride">
        <mat-label>Override reason</mat-label>
        <textarea matInput [(ngModel)]="overrideReason" rows="3"></textarea>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancel</button>
      <button mat-button color="primary" [disabled]="data.matches?.length > 0 && data.canOverride && !overrideReason" (click)="confirmOverride()">Override and Create</button>
    </mat-dialog-actions>
  `
})
export class DuplicateOverrideDialogComponent {
  overrideReason = '';

  constructor(
    public dialogRef: MatDialogRef<DuplicateOverrideDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancel() {
    this.dialogRef.close({ action: 'cancel' });
  }

  confirmOverride() {
    this.dialogRef.close({ action: 'override', reason: this.overrideReason });
  }

  openExisting(id: number) {
    this.dialogRef.close({ action: 'open', id });
  }

  maskSensitive(value: string): string {
    if (!value) return '';
    const cleaned = value.trim();
    if (cleaned.length <= 4) return '*'.repeat(cleaned.length);
    const visiblePrefix = cleaned.slice(0, 2);
    const visibleSuffix = cleaned.slice(-2);
    return `${visiblePrefix}${'*'.repeat(cleaned.length - 4)}${visibleSuffix}`;
  }
}
