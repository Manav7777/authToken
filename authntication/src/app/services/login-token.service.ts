import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ModalService } from '../_modal';
import Route from '../route';


@Injectable({
  providedIn: 'root',
})
export class LoginTokenService {
  resMessage:any
  constructor(private http: HttpClient,private model:ModalService,private router:Router) {}
  loginUser(user: any) {
    return this.http.post(`${environment.API}login`, user)
  }
  registerUser(user) {
    return this.http.post(`${environment.API}register`, user).subscribe(
      (err) => {
        if (err) console.log(err);
      }
    );
  }
  logoutUser(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate([Route.AUTHNTICATE])
  }
}