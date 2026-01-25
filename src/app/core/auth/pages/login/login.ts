import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApi } from '@core/auth/services/auth-api';
import { AtIcon } from '@shared/icons/at-icon/at-icon';
import { LockIcon } from '@shared/icons/lock-icon/lock-icon';
import { ArrowRightIcon } from '@shared/icons/arrow-right-icon/arrow-right-icon';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, AtIcon, LockIcon, ArrowRightIcon],
  templateUrl: './login.html',
})
export default class Login {
  readonly authApi = inject(AuthApi);
  readonly router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  async submit() {
    console.log(this.form.value);

    const email = this.form.value.email ?? '';
    const password = this.form.value.password ?? '';

    await this.authApi.signIn({ email, password });
  }
}
