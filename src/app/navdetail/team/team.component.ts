
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { NgxNotificationService } from 'ngx-notification';
import { CRUDService } from '../../services/CRUD.service';
import { Department } from '../../interfaces/department.interface';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from '../../interfaces/team.interface';
import { NotificationserviceService } from '../../services/notificationservice.service';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  teamForm: FormGroup;
  submitted = false;
  id;
  departments = [
  ];

  // Columns to be displayed on the view
  displayedColumns: string[] = ['name', 'departmentId', 'dateAdded', 'actions'];

  // Data source to populate the UI with the data received from the server 
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private crudService: CRUDService, private formBuilder: FormBuilder,
    private router: Router, private notificationService: NotificationserviceService, private activatedRoute: ActivatedRoute) {
      this.activatedRoute.params.subscribe(params => this.id = params.id)
  }

  ngOnInit() {
    this.initForm();
    this.getAllTeams(this.id);
    this.getAllDepartments();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createTeam() {

    this.submitted = true;
    console.log(this.teamForm.value)
    this.f.departmentId = { 'id': this.f.departmentId }

    // stop here if form is invalid
    if (this.teamForm.invalid) {
      return;
    }
    this.crudService.post('teams', this.teamForm.value)
      .subscribe(res => {
        this.notificationService.successNotification();
        this.teamForm.reset();
        this.getAllTeams(this.id);
      }, (err) => {
        console.log(err);
        this.notificationService.failureNotication();
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.teamForm.value;
  }

  // Initialize a form group
  initForm() {
    this.teamForm = this.formBuilder.group({
      name: ['', Validators.required],
      departmentId: ['', Validators.required]
    });
  }


  /**
   * Get all the teams from the server
   */
  getAllTeams(id) {
    this.crudService.find('teams/department/', id).subscribe((response: Team[]) => {
      response.reverse();
      console.log(response);
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  /**
   * Get all the departments in the server
   */
  getAllDepartments() {
    this.crudService.findAll('departments').subscribe((response: Department[]) => {
      response.forEach(department => {
        this.departments.push({ value: department.id, viewValue: department.name });
      })
    }, err => console.log(err));
  }

  
  gotoTeamMembers(element) {
    this.router.navigate(['teammembers', element.id]);
  }
}