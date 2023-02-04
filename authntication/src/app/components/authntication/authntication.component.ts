import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import Route from 'src/app/route';
import { LoginTokenService } from 'src/app/services/login-token.service';
import { ModalService } from 'src/app/_modal';
import { LoaderService } from '../common/loader/loader.service';

@Component({
  selector: 'app-authntication',
  templateUrl: './authntication.component.html',
  styleUrls: ['./authntication.component.scss'],
})
export class AuthnticationComponent implements OnInit {
  fb: FormGroup;
  register: FormGroup;
  isSignUp = false;
  submitted = false;
  loginsubmitted = false;
  message: any;
  id: any = '2';
  constructor(
    private loginService: LoginTokenService,
    private formBuilder: FormBuilder,
    private model: ModalService,
    private router: Router,
    private loader:LoaderService
  ) {}

  ngOnInit(): void {
    this.register = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(8),
      ]),
    });
    this.fb = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
    if (localStorage.getItem('user')) {
      this.router.navigate(['/home']);
    }
  }
  submit() {
    if (!this.isSignUp) {
      this.loginsubmitted = true;
      if (this.fb.invalid) {
        return false;
      } else {
        let user = {
          email: this.fb.get('email').value,
          password: this.fb.get('password').value,
        };
        this.loginService.loginUser(user).subscribe(
          (res: any) => {
            if (res) {
              this.loader.showLoader();
              localStorage.setItem('token', JSON.stringify(res.token));
              localStorage.setItem('user', JSON.stringify(res.user));
              this.router.navigate([Route.HOME]);
              this.id = '1';
              this.model.open(this.id);
              this.message = res.msg;
            }
            this.loader.hideLoader();
            this.id = '';
          },
          (err) => {
            if (err) console.log(err);
          }
        );
      }
    } else {
      this.submitted = true;
      if (this.register.invalid) {
        return false;
      } else {
        let user = {
          name: this.register.get('name').value,
          email: this.register.get('email').value,
          password: this.register.get('password').value,
        };
        this.loginService.registerUser(user);
        this.id = '2';
        this.model.open('2');
        this.message = 'You have sucessfully register!';
      }
    }
  }
  singUpMode() {
    this.isSignUp = !this.isSignUp;
    this.loginsubmitted = false;
    this.submitted = false;
    this.register.reset();
    this.fb.reset();
  }
  get r(): { [key: string]: AbstractControl } {
    return this.register.controls;
  }
  get l(): { [key: string]: AbstractControl } {
    return this.fb.controls;
  }
  close() {
    this.model.close('1');
  }
}
