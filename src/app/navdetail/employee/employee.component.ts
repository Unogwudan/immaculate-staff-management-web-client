import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Employee } from '../../interfaces/employee.interface';
import { NotificationserviceService } from '../../services/notificationservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CRUDService } from '../../services/CRUD.service';

export interface Dept {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  submitted = false;

  constructor(private crudService: CRUDService, private formBuilder: FormBuilder,
    private notificationService: NotificationserviceService
  ) { }

  employees = [
  ];
  displayedColumns: string[] = ['firstName', 'middleName', 'lastName', 'address', 'phone', 'email', 'salary', 'actions'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.initForm();
    this.getAllEmployees();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // convenience getter for easy access to form fields
  get f() { return this.employeeForm.value; }

  // Initialize a form group
  initForm() {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', Validators.required],
      accountName: ['', Validators.required],
      accountNumber: ['', Validators.required]
    });
  }

  /**
   * 
   * Create a new employee
   */
  addNewEmployee() {
    this.submitted = true;
    console.log(this.employeeForm.value)

    // stop here if form is invalid
    if (this.employeeForm.invalid) {
      return;
    }
    this.crudService.post('employees', this.employeeForm.value)
      .subscribe(res => {
        console.log(res);
        this.notificationService.successNotification();
        this.employeeForm.reset();
        this.getAllEmployees();
      }, (err) => {
        this.notificationService.failureNotication();
      })
  }

  /**
   * 
   * Get all the employees from the server
   */
  getAllEmployees() {
    this.crudService.findAll('employees').subscribe((response: Employee[]) => {
      response.reverse();
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, err => console.log(err));
  }

}

