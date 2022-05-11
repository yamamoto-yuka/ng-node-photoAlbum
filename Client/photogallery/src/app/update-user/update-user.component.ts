import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';


  constructor(private cs:CommonService) { }

  updateUser() {
    
  }

  ngOnInit(): void {
    console.log(localStorage.getItem("photoUserID"))
    let UserID = localStorage.getItem("photoUserID");
    this.cs.getUser(UserID).subscribe((userDetails) => {
      console.log(userDetails);
      this.name = userDetails.userData[0].user_name
      this.email = userDetails.userData[0].email
      this.password = userDetails.userData[0].password
    })
  }
}
