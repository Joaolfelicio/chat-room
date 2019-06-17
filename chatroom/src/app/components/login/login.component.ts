import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  constructor(private us: UsersService, private routing: Router) {}
  username: string;
  pass: string;
  hash: string = '';
  info;

  create() {
    this.us
      .loginAccount(this.username, this.pass)
      .subscribe(res => this.loginFeedback(res));
  }

  loginFeedback(userData) {
    document.querySelector('#login-helper').textContent = '';
    console.log(userData);
    // User Sucess
    if (userData.retour.length > 2) {
      this.hash = userData.retour;
      console.log('Login with sucess');
      localStorage.setItem('userHash', this.hash);
      document.querySelector('#login-helper').textContent =
        'Login with sucess, redirecting to chatroom';
      this.routing.navigate(['chatroom']);

      // Failure at least 6 char
    } else {
      console.log('Failed to login');
      document.querySelector('#login-helper').textContent =
        'Wrong combination or user doesnt exist';
    }
    this.username = '';
    this.pass = '';
  }

  logOut() {
    this.hash = '';
    localStorage.setItem('userHash', this.hash);
  }

  ngOnInit() {
    if (localStorage.getItem('userHash')) {
      this.hash = localStorage.getItem('userHash');
    }
  }
}
