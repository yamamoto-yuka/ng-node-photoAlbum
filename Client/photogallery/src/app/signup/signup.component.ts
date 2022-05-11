import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  signupStatus = false;
  signupmessage: any = '';
  constructor(private cs: CommonService) {}

  signup() {
    this.cs
      .signupService(this.name, this.email, this.password)
      .subscribe((signupData) => {
        console.log(signupData.signup);
        this.signupStatus = signupData.signup;
        this.signupmessage = signupData.message;
        console.log(this.signupmessage);
      });
  }
  ngOnInit(): void {}
}
