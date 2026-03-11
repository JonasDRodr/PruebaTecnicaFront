import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { ReporteEncuesta } from '../../Modules/encuesta.module';
import { EncuestaService } from '../../core/services/encuesta.service';
import { ReporteService } from '../../core/services/reporte.service';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporte.html',
  styleUrl: './reporte.css'
})
export class Reporte implements OnInit {

  reporte = signal<ReporteEncuesta | null>(null);
  loading = signal<boolean>(true);
  errorMsg = signal<string>('');
  private platformId = inject(PLATFORM_ID);

  constructor(private reporteService: ReporteService) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarReporte();
    } else {
      this.loading.set(false);
    }
  }

  cargarReporte() {
    this.reporteService.getReporte(1).subscribe({
      next: (response: ReporteEncuesta) => {
        this.reporte.set(response);
        this.loading.set(false);
        console.log('Reporte cargado:', this.reporte());
      },
      error: (err) => {
        this.errorMsg.set(err.error?.message || 'Error al cargar el reporte.');
        this.loading.set(false);
      }
    });
  }

  getNpsClass(): string {
    const nps = this.reporte()?.nps ?? 0;
    if (nps >= 50) return 'text-success';
    if (nps >= 0) return 'text-warning';
    return 'text-danger';
  }

  getDistribucionEntries(): { key: number, value: number }[] {
    const dist = this.reporte()?.distribucion;
    if (!dist) return [];
    return Object.entries(dist)
      .map(([k, v]) => ({ key: Number(k), value: v }))
      .sort((a, b) => a.key - b.key);
  }

  getBarWidth(value: number): number {
    const max = Math.max(...Object.values(this.reporte()?.distribucion ?? {}));
    return max > 0 ? (value / max) * 100 : 0;
  }

  getBarClass(key: number): string {
    if (key >= 9) return 'bg-success';
    if (key >= 7) return 'bg-warning';
    return 'bg-danger';
  }
}