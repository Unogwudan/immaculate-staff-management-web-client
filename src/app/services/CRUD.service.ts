import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  baseUrl = 'http://localhost:8080/ImmaculateConsultingStaffManagement/api/';
  constructor(private http: HttpClient) { }

  header = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'No-Auth': 'true'
      // 'Authorization': btoa(unescape(encodeURIComponent(localStorage.getItem('token'))))
    }
  );

  /**
   * Query the api against an id
   */
  find(path, id) {
    try {
      return this.http.get(this.baseUrl + path + id, { headers: this.header });
    } catch (e) {
      throw e;
    }
  }

  /**
   * Return alist from the api
   */
  findAll(path) {
    try {
      return this.http.get(this.baseUrl + path, { headers: this.header });
    } catch (e) {
      throw e;
    }
  }

  /**
   * Post data to the api
   * @param 
   */
  post(path, data) {
    return this.http.post(this.baseUrl + path, data, { headers: this.header });
  }

}
