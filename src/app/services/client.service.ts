import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ClientModel {
  id?: string;
  name: string;
  companyValuation: number;
  salary: number;
}

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl: string = 'https://boasorte.teddybackoffice.com.br/';

  constructor(private http: HttpClient) {}

  createUser(user: ClientModel): Observable<ClientModel> {
    return this.http.post<ClientModel>(`${this.baseUrl}users`, user);
  }

  getUsers(page?: number, limit?: number): Observable<ClientModel[]> {
   
    return this.http.get<ClientModel[]>(`${this.baseUrl}users?page=${page}&limit=${limit}`);
  }

  getUserById(id: string): Observable<ClientModel> {
    return this.http.get<ClientModel>(`${this.baseUrl}users/${id}`);
  }

  updateUser(id: string, user: Partial<ClientModel>): Observable<ClientModel> {
    return this.http.patch<ClientModel>(`${this.baseUrl}users/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}users/${id}`);
  }
}
