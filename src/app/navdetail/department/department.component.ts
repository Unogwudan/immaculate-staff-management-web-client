
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { NgxNotificationService } from 'ngx-notification';
import { CRUDService } from '../../services/CRUD.service';
import { Department } from '../../interfaces/department.interface';
import { NgForm } from '@angular/forms';
import { NotificationserviceService } from '../../services/notificationservice.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Division } from '../../interfaces/division.interface';
import { Employee } from '../../interfaces/employee.interface';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  deptForm: FormGroup;
  submitted = false;
  id;

  // Columns to be displayed on the view
  displayedColumns: string[] = ['name', 'divisionId', 'hod', 'dateAdded', 'actions'];

  // Data source to populate the UI with the data received from the server 
  dataSource;
  employees = [
  ];

  divisions = [
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private crudService: CRUDService, private formBuilder: FormBuilder,
    private notificationService: NotificationserviceService, private router: Router, private activatedRoute: ActivatedRoute) {
      this.activatedRoute.params.subscribe(params => this.id = params.id)
  }

  ngOnInit() {
    this.initForm();
    this.getAllDepartments(this.id);
    this.getAllDivsions();
    this.getAllEmployees();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Get all the departments in the server
   */
  getAllDepartments(id) {
    this.crudService.find('departments/division/', id).subscribe((response: Department[]) => {
      response.reverse();
      console.log(response);
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  createDepartment() {
 
    this.submitted = true;
    console.log(this.deptForm.value)
    this.f.hod = {'id': this.f.hod}
    this.f.divisionId = {'id': this.f.divisionId}

    // stop here if form is invalid
    if (this.deptForm.invalid) {
      return;
    }
    this.crudService.post('departments', this.deptForm.value)
      .subscribe(res => {
        console.log(res);
        this.notificationService.successNotification();
        this.deptForm.reset();
        this.getAllDepartments(this.id);
      }, (err) => {
        console.log(err);
        this.notificationService.failureNotication();
      });
  }

  // convenience getter for easy access to form fields
  get f() { 
    return this.deptForm.value; 
  }

  // Initialize a form group
  initForm() {
    this.deptForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      divisionId: ['', Validators.required],
      hod: ['', Validators.required]
    });
  }

  getAllDivsions() {
    this.crudService.findAll('divisions').subscribe((response: Division[]) => {
      response.forEach(division =>{
        this.divisions.push({ value: division.id, viewValue: division.name });
      })
      console.log(response);
    });
  }

   /**
   * 
   * Get all the employees from the server
   */
  getAllEmployees() {
    this.crudService.findAll('employees').subscribe((response: Employee[]) => {
      response.forEach(emp => {
        this.employees.push({ value: emp.id, viewValue: emp.firstName + ' ' + emp.lastName });
      });
      console.log(response);
    });
  }

  gotoTeam(element) {
    this.router.navigate(['teams', element.id]);
  }

}