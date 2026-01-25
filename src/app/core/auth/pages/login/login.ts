import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AtIcon } from '@shared/icons/at-icon/at-icon';
import { LockIcon } from '@shared/icons/lock-icon/lock-icon';
import { ArrowRightIcon } from '@shared/icons/arrow-right-icon/arrow-right-icon';
import { AuthStore } from '@core/auth/services/auth-store';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, AtIcon, LockIcon, ArrowRightIcon],
  templateUrl: './login.html',
})
export default class Login {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  private readonly toast = inject(HotToastService);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  async submit(): Promise<void> {
    const email = this.form.value.email ?? '';
    const password = this.form.value.password ?? '';

    const { error } = await this.authStore.signIn({ email, password });

    if (error) {
      this.toast.error(error.message);
      return;
    }

    await this.router.navigate(['/']);
  }
}
