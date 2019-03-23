import { LoginService } from '../services/login.service';
import { Component, OnInit } from '@angular/core';
import { NgxNotificationService } from 'ngx-notification';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-navdetail',
  templateUrl: './navdetail.component.html',
  styleUrls: ['./navdetail.component.scss']
})
export class NavdetailComponent implements OnInit {

  isEmployee = true;
  isDivision = true;
  isTeam = true;
  isAppraisal = true;
  isAttendance = true;
  isTeamMember = true;
  userName;


  constructor(private router: Router, private loginService: LoginService) {

  }

  ngOnInit() {
    // time = new Observable<string>((observer: Observer<string>) => {
    //   setInterval(() => observer.next(new Date().toString()), 1000);
    // });
    // this.attendanceService.getCheckInOut().subscribe(
    //   (response: any) => {
    //    localStorage.setItem('checkInValid', response.attendanceCheckInValue);
    //     localStorage.setItem('checkIn', response.markCheckIn);
    //      localStorage.setItem('checkOut', response.markCheckOut);
    //   },
    //   (errorResp: HttpErrorResponse) => { console.log(errorResp); }
    // );
    this.getStaffRole();
  }

  /**
   * Log the user out of the system
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('checkInValid');
    localStorage.removeItem('checkIn');
    localStorage.removeItem('checkOut');
    this.router.navigate(['/login']);
  }

  // Check if staff is logged in
  isLoggedInStaff() {
    return this.loginService.isLoggedIn();
  }

  getStaffRole() {
   const role = localStorage.getItem('role');
   this.userName = localStorage.getItem('username');
    if (role === 'Admin') {
      this.isEmployee = true;
      this.isDivision = true;
      this.isTeam = true;
      this.isAppraisal = true;
      this.isAttendance = true;
      this.isTeamMember = true;
    }
    if (role === 'Team Head') {
      this.isAppraisal = true;
      this.isAttendance = true;
    }
    if (role === 'Staff') {
      this.isAttendance = true;
    }
    if (role === 'Accountant') {
      this.isEmployee = true;
      this.isDivision = true;
      this.isTeam = true;
      this.isAppraisal = true;
      this.isAttendance = true;
      this.isTeamMember = true;
    }
  }
}
