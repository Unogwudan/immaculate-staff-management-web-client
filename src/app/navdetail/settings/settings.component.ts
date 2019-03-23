import { Component, OnInit, ViewChild } from '@angular/core';
import { Department } from '../../models/department.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxNotificationService } from 'ngx-notification';
import { HttpClient } from '@angular/common/http';
import { NotificationserviceService } from '../../services/notificationservice.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private notificationService: NotificationserviceService) {
  }

  // New department to be create
  newDepartment = new Department('');
  // Newly created department
  createdDepartment;
  // Hold all the departments
  allDepartments;
  // Hold the selected dept for edit/delete
  selectedDept = new Department('');
  // Hold the selected dept id for edit/delete
  selectedDeptId;
  // Hold the edited dept
  editedDept;
  // Hold the deleted dept
  deletedDept;

  @ViewChild('departmentForm') public createdepartmentForm: NgForm;

  ngOnInit() {
  }

}
