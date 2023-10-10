import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_HOST = 'http://localhost:4000';

@Injectable({ providedIn: 'root' })
export class RequestService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ username: string } | string>(
      `${API_HOST}/user/authenticate`,
      {
        username,
        password,
      }
    );
  }

  register(username: string, password: string) {
    return this.http.post<{ username: string } | string>(
      `${API_HOST}/user/register`,
      {
        username,
        password,
      }
    );
  }
}
