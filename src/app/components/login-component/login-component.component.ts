import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message = 'Username or Password is invalid...';
  invalidLogin: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private login: LoginService,
    private router: Router,
    private toaster: Toaster
  ) { }

  ngOnInit() {
    this.initLoginForm();
  }
  // to init login form data
  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  // to check login details then navigate to users page or show message to user to try again
  // use test as a username and a password, or admin
  onLogin() {
    this.login.onLogin(this.loginForm.value.username, this.loginForm.value.password).subscribe((res: []) => {
      if (res.length == 0) {
        this.invalidLogin = true;
        this.message = 'Invalid Login Credintials';
      } else if (res.length == 1) {
        this.invalidLogin = false;
        this.router.navigateByUrl('users');
      }
    }), err => { }
  }
  // to show toaster :D
  onForgotPassword() {
    this.toaster.open({
      text: 'Sorry to hear that :p',
      duration: 2000,
      type: 'info'
    })
  }

}
