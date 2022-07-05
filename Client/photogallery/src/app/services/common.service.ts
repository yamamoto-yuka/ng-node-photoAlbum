import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface Login {
  login: boolean;
  message: string;
  data: [{
    UserID: number;
    user_name: string;
    email: string;
    password: string;
  }]
}

interface Signup {
  signup: boolean;
  message: any;
}

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private server = environment.server;
  private loginURL = this.server + "login";
  private singupURL = this.server + "signup";
  private userURL = this.server + "user";
  private updateURL = this.server + "updateuser";
  private deleteURL = this.server +"deleteuser'";


  constructor(private http: HttpClient) {}
  loginService(email: string, password: string) {
    let loginbody = {
      email: email,
      password: password,
    };
    // Sendgin to the server
    return this.http.post<Login>(this.loginURL, loginbody);
  }

  signupService(name: string, email: string, password: string) {
    let signupbody = {
      name: name,
      email: email,
      password: password,
    };
    // What type of data would be back
    return this.http.post<Signup>(this.singupURL, signupbody);
  }

  getUser(id: any) {
    return this.http.get<{ user: boolean, message: string, userData: [{ UserID: number, user_name: string, email: string, password: string }] }>(this.userURL + "/" + id);
  }

  updateUser(id: any, user_name:string, email: string, password: string) {
    let updateBody = {
      "userID": id,
      "user_name": user_name,
      "email": email,
      "password": password
    }
    return this.http.put<{update:boolean, message:string}>(this.updateURL, updateBody)
  }

  deleteUser(id: number) {
    return this.http.delete<{ deleteUser:boolean, message:any}>(this.deleteURL + '/' + id);
  }
}
