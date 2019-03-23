import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {

  header = new HttpHeaders(
    {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'No-Auth': 'true'
    }
  );

  baseUrl = 'http://localhost:8080/ImmaculateConsultingStaffManagement/api/';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  /**
   * Log the user in
   * @param username of the user
   * @param password of the user
   */
  login(username: string, password: string) {
    const token = this.http.post(this.baseUrl + 'login',
      'username=' + username + '&password=' + password, { headers: this.header });
      return token;
  }

  /**
   * Return true if user is logged in
   */
  isLoggedIn() {
    const token = localStorage.getItem('token');
    // const accessRight = localStorage.getItem('role');
    // if ( token && accessRight === 'Admin') {
    //   return true;
    // } else if ( token && accessRight === 'Team Head') {
    //   return true;
    // } else if ( token && accessRight === 'Accountant') {
    //   return true;
    // }  else if ( token && accessRight === 'Staff') {
    //   return true;
    // } else {
    //   return false;
    // }

    if(token) {
      return true;
    } else {
      return false;
    }
  }

}
