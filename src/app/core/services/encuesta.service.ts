import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Encuesta } from '../../feature/encuesta/encuesta';
import { EncuestaDto, SubmitRespuestaRequest } from '../../Modules/encuesta.module';

@Injectable({
  providedIn: 'root',
})
export class EncuestaService {
  private http = inject(HttpClient);
  private apiUrlRegistra = 'https://localhost:7068/api/Encuesta/responder';
  private apiUrlEncuestaId = 'https://localhost:7068/api/Encuesta/';
  
  postEncuestaId(encuesta: EncuestaDto): Observable<EncuestaDto> {
    return this.http.get<EncuestaDto>(this.apiUrlEncuestaId + encuesta.id);
  }
  postRespondeEncuesta(encuesta: SubmitRespuestaRequest): Observable<SubmitRespuestaRequest> {
    return this.http.post<SubmitRespuestaRequest>(this.apiUrlRegistra,encuesta);
  }
}
