// src/app/shared/material-ui.imports.ts
import { importProvidersFrom } from '@angular/core';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';

export const MATERIAL_UI_MODULES = [
  CommonModule,
  // BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,

  // Material Modules
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatPaginatorModule,
  MatSortModule,
  MatOptionModule,
  MatTableModule,
  MatListModule, 

  // 🟢 Add These Two for Datepicker
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule
];
