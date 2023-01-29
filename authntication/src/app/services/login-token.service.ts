import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModalService } from '../_modal';


@Injectable({
  providedIn: 'root',
})
export class LoginTokenService {
  resMessage:any
  constructor(private http: HttpClient,private model:ModalService) {}
  loginUser(user: any) {
    return this.http.post(`${environment.API}login`, user)
  }
  registerUser(user) {
    return this.http.post(`${environment.API}register`, user).subscribe(
      (err) => {
        if (err) console.log(err);
        console.log('Success');
      }
    );
  }
}
