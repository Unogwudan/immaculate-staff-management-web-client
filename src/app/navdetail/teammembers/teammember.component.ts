
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { NgxNotificationService } from 'ngx-notification';
import { CRUDService } from '../../services/CRUD.service';
import { Department } from '../../interfaces/department.interface';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamMember } from '../../interfaces/teammember.interface';
import { NotificationserviceService } from '../../services/notificationservice.service';
import { Team } from '../../interfaces/team.interface';
import { Employee } from '../../interfaces/employee.interface';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-teammember',
  templateUrl: './teammember.component.html',
  styleUrls: ['./teammember.component.scss']
})
export class TeamMemberComponent implements OnInit {
  teamMemberForm: FormGroup;
  submitted = false;
  teams = [];
  employees = [];
  id;
  // Columns to be displayed on the view
  displayedColumns: string[] = ['staffId', 'teamId', 'dateAdded', 'actions'];
  // Data source to populate the UI with the data received from the server 
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private crudService: CRUDService, private formBuilder: FormBuilder,
    private notificationService: NotificationserviceService, private activatedRoute: ActivatedRoute) {
      this.activatedRoute.params.subscribe(params => this.id = params.id)
  }
  ngOnInit() {
    this.initForm();
    this.getAllTeamMembers(this.id);
    this.getAllEmployees();
    this.getAllTeams();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // convenience getter for easy access to form fields
  get f() { return this.teamMemberForm.value; }

    // Initialize a form group
    initForm() {
      this.teamMemberForm = this.formBuilder.group({
        staffId: ['', Validators.required],
        teamId: ['', Validators.required]
      });
    }

  addTeamMember() {

    this.submitted = true;
    console.log(this.teamMemberForm.value)
    this.f.teamId = { 'id': this.f.teamId }
    this.f.staffId = { 'id': this.f.staffId }

    // stop here if form is invalid
    console.log(this.teamMemberForm.value)
    if (this.teamMemberForm.invalid) {
      return;
    }
    this.crudService.post('teammembers', this.teamMemberForm.value)
      .subscribe(res => {
        this.notificationService.successNotification();
        this.teamMemberForm.reset();
        this.getAllTeamMembers(this.id);
      }, (err) => {
        console.log(err);
        this.notificationService.failureNotication();
      });
  }

  /**
   * Get all the teams from the server
   */
  getAllTeamMembers(id) {
    this.crudService.find('teammembers/team/', id).subscribe((response: TeamMember[]) => {
      response.reverse();
      console.log(response);
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

   /**
   * Get all the teams from the server
   */
  getAllTeams() {
    this.crudService.findAll('teams').subscribe((response: Team[]) => {
      response.forEach(department => {
        this.teams.push({ value: department.id, viewValue: department.name });
      })
    })
  }

    /**
   * 
   * Get all the employees from the server
   */
  getAllEmployees() {
    this.crudService.findAll('employees').subscribe((response: Employee[]) => {
      response.forEach(employee => {
        this.employees.push({ value: employee.id, viewValue: employee.firstName + ' ' + employee.lastName });
      })
    }, err => console.log(err));
  }

}