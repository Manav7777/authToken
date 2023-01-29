import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { LoginTokenService } from 'src/app/services/login-token.service';


@Component({
  selector: 'app-authntication',
  templateUrl: './authntication.component.html',
  styleUrls: ['./authntication.component.scss']
})
export class AuthnticationComponent implements OnInit {
  fb:FormGroup;
  register:FormGroup
  isSignUp = false;
  constructor(private loginService:LoginTokenService) { }

  ngOnInit(): void {
    this.register = new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required , Validators.email]),
      password: new FormControl('',[Validators.required])
    })
    this.fb = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }
  submit(){
    if(!this.isSignUp){
      let user = {
        email:this.fb.get('email').value,
        password:this.fb.get('password').value
      }
      this.loginService.loginUser(user);
    }else{
      let user = {
        name:this.register.get('name').value,
        email:this.register.get('email').value,
        password:this.register.get('password').value
      }
      this.loginService.registerUser(user)
    }
  }
  singUpMode(){
    console.log('worked')
    this.isSignUp = !this.isSignUp;
  }
}
