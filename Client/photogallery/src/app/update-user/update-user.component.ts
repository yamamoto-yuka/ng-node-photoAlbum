import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  user_name: string = '';
  email: string = '';
  password: string = '';
  updateStatus = false;
  // form: FormGroup;
  showMessage = 'none';


  constructor(private cs: CommonService, private router:Router) { 
  }

  // get name() {
  //   return this.form.get('name');
  // }

  updateUser() {
    let id = localStorage.getItem('photoUserID');
    this.cs.updateUser(id, this.user_name, this.email, this.password).subscribe((updateConfirmation) => {
      console.log(updateConfirmation);
      // this.updateStatus = updateConfirmation.update;
      this.showMessage = 'block';
      this.updateStatus = updateConfirmation.update;
    })
  }

  deleteUser() {
    if (confirm('Are you sure?')) {
          let userID:any = localStorage.getItem('photoUserID');
      this.cs.deleteUser(userID).subscribe((response) => {
      console.log(response);
      if (response.deleteUser) {
        localStorage.setItem('photoUserID', "0");
        this.router.navigate(['/signup']);
      }
    })
    }
  }

  ngOnInit(): void {
    console.log(localStorage.getItem("photoUserID"))
    let UserID = localStorage.getItem("photoUserID");
    this.cs.getUser(UserID).subscribe((userDetails) => {
      console.log(userDetails);
      this.user_name = userDetails.userData[0].user_name
      this.email = userDetails.userData[0].email
      this.password = userDetails.userData[0].password
    })
  }
}
