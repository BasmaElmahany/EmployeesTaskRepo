import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';   

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:44310/api/Auth'; 

  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  decodeToken(): any {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
