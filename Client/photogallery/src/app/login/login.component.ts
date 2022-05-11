import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loginStatus = true;

  constructor(private cs: CommonService, private router: Router) {}
  login() {
    this.cs.loginService(this.email, this.password).subscribe((loginData) => {
      // loginData.login = this data is from server!
      console.log(loginData.login);
      this.loginStatus = loginData.login;
      if (loginData.login) {
        // Navigate method taked an array. The first element is the path and the rest are parameters
        console.log(loginData.data[0].UserID)
        localStorage.setItem("photoUserID",JSON.stringify(loginData.data[0].UserID))
        this.router.navigate(['/photos']);
      }
    });
  }

  ngOnInit(): void {}
}
