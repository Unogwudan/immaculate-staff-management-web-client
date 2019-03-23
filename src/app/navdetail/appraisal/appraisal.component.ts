import { AppraisalModel } from '../../models/appraisal.model';
import { NgxNotificationService } from 'ngx-notification';
import { Employee } from '../../interfaces/employee.interface';
import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {MatSort, MatPaginator, MatTableDataSource} from '@angular/material';
import { AppraisalInterface } from '../../interfaces/appraisal.interface';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationserviceService } from '../../services/notificationservice.service';

@Component({
  selector: 'app-appraisal',
  templateUrl: './appraisal.component.html',
  styleUrls: ['./appraisal.component.scss'],

})


export class AppraisalComponent implements OnInit {

  displayedColumns: string[] = ['appraisedByList', 'appraisedStaffList',
                                 'appraisedStaffDept', 'appraisedComments',
                                 'dateAppraised', 'actions'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('appraisal') appraisalForm: NgForm;
  @ViewChild('appraisalEdit') appraisalEditForm: NgForm;
  staffobject: AppraisalInterface[];
  selectedStaff: string;
  appraisalObject = new AppraisalModel();
  selectedObject = this.appraisalObject;
  ifTrue = false;
  responseSuccess = false;
  responseFail = false;


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private notification: NotificationserviceService) { }
  ngOnInit() {

  }
  onClickView(selected) {
    this.ifTrue = true;
    this.selectedObject = selected;

  }

  // onEdited() {
  //   this.appraisalService.updateAppraisal(this.selectedObject).subscribe(
  //     (response: AppraisalModel ) => {

  //       this.ngOnInit();
  //       this.notification.successfulUpdatedNotification();
  //     },
  //     (appError: HttpErrorResponse) => {
  //       this.notification.failureupdatingNotication();
  //     }
  //   );

  //   this.appraisalEditForm.reset();
  // }
  // initTableView() {
  //   this.appraisalService.getAllAppraisal().subscribe((response) => {
  //     this.dataSource = new MatTableDataSource(response);
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;

  //   });
  // }
  // onSubmit() {
  //   this.appraisalObject.appraisedComments = this.appraisalForm.value.comment;
  //   this.appraisalObject.dateAppraised = this.appraisalForm.value.appraisal_date;
  //   this.appraisalService.addAppraisal(this.appraisalObject, this.selectedStaff).subscribe(
  //     (response) => {
  //       this.ngOnInit();
  //       this.notification.customNotification('Appraisal saved successfully', 'success', 'center');
  //     },
  //     (appError: HttpErrorResponse) => {
  //       this.notification.customNotification('Error, failed to save Appraisal', 'danger', 'center');

  //     }
  //   );
  //   this.appraisalForm.reset();
  // }


}



