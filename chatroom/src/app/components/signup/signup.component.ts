import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  constructor(private us: UsersService, private routing: Router) {}
  username: string;
  pass: string;
  hash: string = '';
  info;

  h;

  register() {
    this.us
      .createAccount(this.username, this.pass)
      .subscribe(res => this.registerFeedback(res));
  }

  registerFeedback(userData) {
    document.querySelector('#create-helper').textContent = '';

    // User Sucess
    if (userData.retour.length > 2) {
      this.hash = userData.retour;
      console.log('Created with sucess');
      localStorage.setItem('userHash', this.hash);
      document.querySelector('#create-helper').textContent =
        'Created account, redirecting to chatroom';
      this.routing.navigate(['chatroom']);

      // Failure at least 6 char
    } else if (userData.retour === -1) {
      console.log('Failed to create, fields should have at least 5 char');
      document.querySelector('#create-helper').textContent =
        'Username and Password should have at least 5 caracters';

      // Failure, user already exists
    } else {
      console.log('Failed to create, user already exists');
      document.querySelector('#create-helper').textContent =
        'Username already exists';
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
