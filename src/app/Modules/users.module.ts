export interface User {
  id: number;
  idRol: number;
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userName: string;
  rol: string;
}