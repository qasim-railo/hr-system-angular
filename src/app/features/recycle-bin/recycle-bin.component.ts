import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RecycleBinItem } from '../../core/models/recycle-bin.model';
import { RecycleBinService } from '../../core/services/recycle-bin.service';

@Component({ standalone: true, selector: 'app-recycle-bin', imports: [CommonModule], templateUrl: './recycle-bin.component.html' })
export class RecycleBinComponent implements OnInit {
  items: RecycleBinItem[] = [];
  error = '';
  constructor(private recycleBin: RecycleBinService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.recycleBin.get().subscribe({ next: items => this.items = items, error: err => this.error = err?.error?.message || 'Unable to load recycle bin.' }); }
  restore(item: RecycleBinItem): void { this.recycleBin.restore(item).subscribe({ next: () => this.load(), error: err => this.error = err?.error?.message || 'Unable to restore record.' }); }
  purge(item: RecycleBinItem): void { this.recycleBin.purge(item).subscribe({ next: () => this.load(), error: err => this.error = err?.error?.message || 'Unable to purge record.' }); }
}
