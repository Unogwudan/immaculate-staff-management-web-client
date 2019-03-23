import { NotificationserviceService } from '../../services/notificationservice.service';
import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CRUDService } from '../../services/CRUD.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Division } from '../../interfaces/division.interface';
import { Employee } from '../../interfaces/employee.interface';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {

  constructor(private crudService: CRUDService, private notificationService: NotificationserviceService,
    private router: Router, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,) {
    this.activatedRoute.params.subscribe(params => this.id = params.id);
  }

  employees = [
  ];

  displayedColumns: string[] = ['name', 'unitHead', 'description', 'dateAdded', 'actions'];
  dataSource;
  divisionForm: FormGroup;
  submitted = false;
  id;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.initForm();
    this.getAllEmployees();
    this.getAllDivsions();
  }

  getAllDivsions() {
    this.crudService.findAll('divisions').subscribe((response: Division[]) => {
      response.reverse();
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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

  /**
   * 
   * Create a new division
   */
  addNewDivision() {
    this.submitted = true;
    console.log(this.divisionForm.value)
    this.f.unitHead = {'id': this.f.unitHead}

    // stop here if form is invalid
    if (this.divisionForm.invalid) {
      return;
    }
    this.crudService.post('divisions', this.divisionForm.value)
      .subscribe(res => {
        console.log(res);
        this.notificationService.successNotification();
        this.divisionForm.reset();
        this.getAllDivsions();
      }, (err) => {
        console.log(err);
        this.notificationService.failureNotication();
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.divisionForm.value; }

  // Initialize a form group
  initForm() {
    this.divisionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      unitHead: ['', Validators.required],
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  gotoDepts(element) {
    this.router.navigate(['departments', element.id]);
  }

}
