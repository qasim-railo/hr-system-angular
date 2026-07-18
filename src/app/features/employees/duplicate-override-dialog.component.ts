import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-duplicate-override-dialog',
  standalone: true,
  imports: [MatDialogModule, MatListModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  template: `
  <h2 mat-dialog-title>Potential Duplicates Found</h2>
  <mat-dialog-content>
    <p *ngIf="data.matches?.length === 0">No matches.</p>
    <div *ngFor="let c of data.matches">
      <mat-list>
        <mat-list-item>
          <div>
            <strong>{{c.firstName}} {{c.lastName}}</strong> — {{c.companyName}}<br>
            <small>Matched fields: {{c.matchedFields.join(', ')}}</small>
          </div>
          <button mat-button (click)="openExisting(c.employeeId)">Open</button>
        </mat-list-item>
      </mat-list>
    </div>

    <mat-form-field appearance="fill" *ngIf="data.canOverride">
      <mat-label>Override reason</mat-label>
      <textarea matInput [(ngModel)]="overrideReason"></textarea>
    </mat-form-field>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button (click)="cancel()">Cancel</button>
    <button mat-button color="primary" [disabled]="data.matches?.length>0 && data.canOverride && !overrideReason" (click)="confirmOverride()">Override and Create</button>
  </mat-dialog-actions>
  `
})
export class DuplicateOverrideDialogComponent {
  overrideReason = '';
  constructor(
    public dialogRef: MatDialogRef<DuplicateOverrideDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancel() { this.dialogRef.close({ action: 'cancel' }); }

  confirmOverride() { this.dialogRef.close({ action: 'override', reason: this.overrideReason }); }

  openExisting(id: number) {
    // close and indicate open
    this.dialogRef.close({ action: 'open', id });
  }
}
