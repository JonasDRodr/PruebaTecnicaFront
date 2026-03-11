import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse, User } from '../../Modules/users.module';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrlLogin = 'https://localhost:7068/api/Auth/login';
  
  postConsultaLogin(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrlLogin,user);
  }
}
