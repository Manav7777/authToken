import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginTokenService } from 'src/app/services/login-token.service';
import { LoaderService } from '../common/loader/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userDetails:any=[]
  constructor(private router:Router,private login:LoginTokenService,private loader:LoaderService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      const userDetail = JSON.parse(localStorage.getItem('user'))
      this.userDetails.push(userDetail)
    }
  }
  logout(){
    return this.login.logoutUser();
  }

}
