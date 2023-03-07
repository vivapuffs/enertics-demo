import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private expressServer = 'http://localhost:8080'
  private statusURL = '/api/status'

  constructor(private http: HttpClient) { }

  getStatus(token: string) {
    console.log(token)
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`})
    return this.http.get(this.expressServer + this.statusURL, {headers})
  }
}
