import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLogin: boolean = true;
  constructor(private auth: AuthService, private router: Router) {
    auth.isLogin$.subscribe((bool) => (this.isLogin = bool));
  }
  submitted = false;
  hide = true;
  form = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {}

  submit() {
    if (this.form.invalid) {
      return;
    }
    if (
      this.form.value.emailFormControl &&
      this.form.value.passwordFormControl
    ) {
      // Начинается работа с сервером и мы блокируем кнопку
      this.submitted = true;
      const user: User = {
        email: this.form.value.emailFormControl,
        password: this.form.value.passwordFormControl,
        returnSecureToken: true,
      };

      // Логин или рег
      if (this.isLogin) {
        this.auth.login(user).subscribe(
          () => {
            this.form.reset();
            this.router.navigate(['/films']);
            // Работа закончена разблокируем кнопку
            this.submitted = false;
          },
          () => {
            this.submitted = false;
          }
        );
      } else {
        this.auth.signup(user).subscribe(() => {
          this.form.setValue({emailFormControl: '', passwordFormControl: ''});
          this.submitted = false;
          this.auth.isLogin(true);
          this.router.navigate(['/']);
          
        },() => {
          this.submitted = false;
        })
          
      }
    }
  }
}
