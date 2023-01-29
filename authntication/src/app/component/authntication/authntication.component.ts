import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { LoginTokenService } from 'src/app/services/login-token.service';
import { ModalService } from 'src/app/_modal';


@Component({
  selector: 'app-authntication',
  templateUrl: './authntication.component.html',
  styleUrls: ['./authntication.component.scss']
})
export class AuthnticationComponent implements OnInit {
  fb:FormGroup;
  register:FormGroup
  isSignUp = false;
  submitted = false;
  loginsubmitted =false;
  message:any;
  constructor(private loginService:LoginTokenService,private formBuilder:FormBuilder,private model:ModalService) { }

  ngOnInit(): void {
    this.register = this.formBuilder.group({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required , Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(10)])
    })
    this.fb = this.formBuilder.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }
  submit(){
    if(!this.isSignUp){
      this.loginsubmitted=true;
    if(this.fb.invalid){
      return false;
    }else{
      let user = {
        email:this.fb.get('email').value,
        password:this.fb.get('password').value
      }
      this.loginService.loginUser(user).subscribe(
        (res:any)=>{
          if(res){
            console.log('res',res);
            localStorage.setItem('token',JSON.stringify(res.token));
            this.model.open('1');
            this.message = res.msg;
          }
        },
        (err) => {
          if (err) console.log(err);
          console.log('Success-login');
        }
      );
      console.log('info',this.loginService.resMessage)
    }
    }else{
      this.submitted=true;
      if(this.register.invalid){
        return false;
      }else{
        let user = {
          name:this.register.get('name').value,
          email:this.register.get('email').value,
          password:this.register.get('password').value
        }
        this.loginService.registerUser(user)
      }
    }
  }
  singUpMode(){
    console.log('worked')
      this.isSignUp = !this.isSignUp;
  }
  get r():{ [key: string]:AbstractControl} {
    return this.register.controls
  }
  get l():{ [key: string]:AbstractControl} {
    return this.fb.controls
  }
}
