import { NgxNotificationService } from 'ngx-notification';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationserviceService {

  constructor(private ngxNotificationService: NgxNotificationService ) { }
  customNotification(message: string, messagetype: string, position: string ) {
    this.ngxNotificationService.sendMessage(message, messagetype, position);
   }
  successNotification() {
    this.ngxNotificationService.sendMessage('Successfully saved!', 'success', 'center');
   }
   successfulUpdatedNotification() {
    this.ngxNotificationService.sendMessage('Update saved!', 'success', 'center');
   }
   infoNotication() {
    this.ngxNotificationService.sendMessage('Welcome!!', 'info', 'center');
   }

   failureNotication() {
    this.ngxNotificationService.sendMessage('Error, failed!!!', 'danger', 'center');
   }
   failureupdatingNotication() {
    this.ngxNotificationService.sendMessage('Updating failed!', 'danger', 'center');
   }
   // Deleted Notification
  deleteNotification() {
    this.ngxNotificationService.sendMessage('Deleted Successfully!!!', 'success', 'center');
  }

  // Status Change Notification
  statusChangeNotification() {
    this.ngxNotificationService.sendMessage('Staff Status Changed Successfully!!!', 'success', 'center');
  }

  // Welcome Notification
  simpleNotification() {
    this.ngxNotificationService.sendMessage('Welcome!!!', 'info', 'center');
  }

  // Wrong Password Notification
  wrongPasswordNotification() {
    this.ngxNotificationService.sendMessage('Error, Old Password is Incorrect!!!', 'danger', 'center');
  }

  // Password Change Notification
  passwordChangeNotification() {
    this.ngxNotificationService.sendMessage('Password Changed Successfully!!!', 'success', 'center');
  }
}
