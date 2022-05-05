import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface Login {
  login: boolean;
  message: string;
}

interface Signup {
  signup: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private loginURL = 'http://localhost:4400/login';
  private singupURL = 'http://localhost:4400/signup';

  constructor(private http: HttpClient) {}
  loginService(email: string, password: string) {
    let loginbody = {
      email: email,
      password: password,
    };
    return this.http.post<Login>(this.loginURL, loginbody);
  }

  signupService(name: string, email: string, password: string) {
    let signupbody = {
      name: name,
      email: email,
      password: password,
    };
    return this.http.post<Signup>(this.singupURL, signupbody);
  }
}
