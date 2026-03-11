import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EncuestaService } from '../../core/services/encuesta.service';
import { OpcionDto,EncuestaDto, PreguntaDto, SubmitRespuestaRequest } from '../../Modules/encuesta.module';

interface Pregunta {
  id: number;
  texto: string;
  valor: number;
}

@Component({
  selector: 'app-encuesta',
  imports: [CommonModule, FormsModule],
  templateUrl: './encuesta.html',
  styleUrl: './encuesta.css',
})
export class Encuesta implements OnInit {

  private encuestaService = inject(EncuestaService);

  errorLogin = signal<string>('');

  preguntas: Pregunta[] = [
    { id: 1, texto: '¿Qué tan satisfecho estás con la calidad del servicio?', valor: 5 },
    { id: 2, texto: '¿Cómo calificarías la rapidez en la atención?', valor: 5 },
    { id: 3, texto: '¿Qué tan probable es que nos recomiendes?', valor: 5 },
    { id: 4, texto: '¿Cómo evalúas la claridad de la información?', valor: 5 },
    { id: 5, texto: '¿Qué tan satisfecho estás con la relación calidad-precio?', valor: 5 },
  ];

  loading = false;
  errorMsg = '';
  successMsg = signal<string>('');

  idEncuesta: number = 0;
  nombreEncuesta = signal<string>('');
  showEncuesta = signal<boolean>(false);
  preguntasEncuesta = signal<PreguntaDto[]>([]);
  
  
  ngOnInit() {
    
  }
  
  TraerEncuesta(idEncuesta: number) {
    const request: EncuestaDto = {
      id: idEncuesta,
      nombre: '',
      preguntas: [],
      yaRespondio: false
    };
    
    this.encuestaService.postEncuestaId(request).subscribe({
      next: (response: any) => {
          if (response.yaRespondio) {
            this.errorLogin.set('Ya respondiste esta encuesta.');
            setTimeout(() => this.errorLogin.set(''), 3000);
            return;
          }

          const preguntas = response.preguntas.map((p: PreguntaDto) => ({
            ...p,
            valorSeleccionado: 5
          }));
          this.nombreEncuesta.set(response.nombre);
          this.preguntasEncuesta.set(preguntas);
          this.showEncuesta.set(true);
        },
       error: (err) => {
        this.errorLogin.set(err.error?.message || 'Error al loguear usuario');
        setTimeout(() => {
          this.errorLogin.set('');
        }, 3000); // 3 segundos
        console.error('Error al loguear usuario:', this.errorLogin);
       }
     });
  }

  enviarRespuestas() {

    const preguntas = this.preguntasEncuesta();

    preguntas.forEach((pregunta: PreguntaDto) => {
      const opcionSeleccionada = pregunta.opciones
        .find(o => o.numeroOpcion === pregunta.valorSeleccionado);

      if (!opcionSeleccionada) return;

      const request: SubmitRespuestaRequest = {
        idOpcion: opcionSeleccionada.id
      };

      this.encuestaService.postRespondeEncuesta(request).subscribe({
        next: () => {
          this.successMsg.set('¡Respuestas enviadas correctamente!');
        },
        error: (err) => {
          this.errorLogin.set(err.error?.error || 'Error al enviar respuesta');
        }
      });
    });
  }
}
