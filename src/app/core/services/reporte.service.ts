import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EncuestaDto, OpcionDto, ReporteEncuesta, SubmitRespuestaRequest } from '../../Modules/encuesta.module';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  private http = inject(HttpClient);
  private apiUrlEncuestaId = 'https://localhost:7068/api/Reporte/';
  
  getReporte(encuestaId: number): Observable<ReporteEncuesta> {
    return this.http.get<ReporteEncuesta>(this.apiUrlEncuestaId + encuestaId);
  }
}
