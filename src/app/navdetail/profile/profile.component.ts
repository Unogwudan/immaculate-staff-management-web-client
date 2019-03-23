import { Component, OnInit } from '@angular/core';
import { Employee } from '../../interfaces/employee.interface';
import { NgxNotificationService } from 'ngx-notification';
import { NotificationserviceService } from '../../services/notificationservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private notificationService: NotificationserviceService) {
  }

  // Logged in user info
  staff: Employee;
  // Username of the logged in user
  username;
  // Edited profile of the logged in user
  editedProfile;
  // Current password of the user
  oldPassword;
  // New password of the user
  newPassword;


  ngOnInit() {
    //this.username = localStorage.getItem('username');
  }

  // /**
  //  * Update staff password
  //  */
  // updatePassword() {
  //   this.staffService.getStaff(localStorage.getItem('username'))
  //     .subscribe((response) => {
  //       this.staff = JSON.parse((JSON.stringify(response)));
  //       if (this.staff.password === this.oldPassword) {
  //         this.staff.password = this.newPassword;

  //         this.staffService.editStaff(this.staff)
  //           .subscribe((response) => {
  //             // Display Success notification
  //             this.notificationService.passwordChangeNotification();
  //           },
  //             (err: HttpClient) => {
  //               // Show Failure Notification
  //               this.notificationService.failureNotication();
  //             });
  //       } else {
  //         // Show Failure Notification
  //         this.notificationService.wrongPasswordNotification();
  //       }
  //     },
  //       (err: HttpClient) => {
  //         // Show Failure Notification
  //         this.notificationService.failureNotication();
  //       });
  // }

}
