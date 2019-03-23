import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { HttpClient } from 'selenium-webdriver/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  // Check if there is an error in login
  isLoginError = false;

  constructor(private loginService: LoginService,
    private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.value; }

  // Initialize a form group
  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.f.username, this.f.password)
      .subscribe((response: any) => {
        // localStorage.setItem('token', response.message);
        // localStorage.setItem('username', response.username);
        // localStorage.setItem('role', response.role);
        this.router.navigate(['']);
      },
        (err: HttpClient) => {
          console.log(err);
          this.isLoginError = true;
        });
    console.log(this.loginForm.value);

    alert('SUCCESS!! :-)')
  }

  /**
   * Log User into the app
   */
  login() {
    this.router.navigate(['']);
    localStorage.setItem('token', 'abcdef');

    // this.loginService.login(this.username, this.password)
    //   .subscribe((response: any) => {
    //     localStorage.setItem('token', response.message);
    //     localStorage.setItem('username', response.username);
    //     localStorage.setItem('role', response.role);
    //     this.router.navigate(['']);
    //   },
    //     (err: HttpClient) => {
    //       console.log(err);
    //       this.isLoginError = true;
    //     });
  }

  // /**
  //  * Check if user is logged in
  //  */
  // loggedIn() {
  //   return true;
  //   // return !!localStorage.getItem('token');
  // }

}
