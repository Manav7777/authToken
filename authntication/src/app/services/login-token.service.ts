import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class LoginTokenService {
  constructor(private http: HttpClient) {}
  loginUser(user: any) {
    return this.http.post(`${environment.API}login`, user)
    .subscribe(
      (res:any)=>{
        if(res){
          console.log('res',res);
          localStorage.setItem('token',JSON.stringify(res.token))
          alert(res.msg)
        }
      },
      (err) => {
        if (err) console.log(err);
        console.log('Success-login');
      }
    );
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
