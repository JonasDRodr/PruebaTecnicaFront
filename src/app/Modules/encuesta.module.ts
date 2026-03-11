export interface OpcionDto {
  id: number;
  numeroOpcion: number;
}

export interface PreguntaDto {
  id: number;
  numeroPregunta: number;
  texto: string;
  tipo: string;
  opciones: OpcionDto[];
  valorSeleccionado: number;
}

export interface EncuestaDto {
  id: number;
  nombre: string;
  preguntas: PreguntaDto[];
  yaRespondio: boolean;
}

export interface SubmitRespuestaRequest {
  idOpcion: number;
}

export interface ReporteEncuesta {
  totalEncuestados: number;
  promotores: number;
  neutros: number;
  detractores: number;
  nps: number;
  distribucion: { [key: number]: number };
}