import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '@auth/services';
import { FormUtils } from '@common/helpers';
import { ThemeButton, ThemedInput, ThemeText } from '@common/theme';

@Component({
  selector: 'app-login-page',
  imports: [ThemedInput, ReactiveFormsModule, ThemeButton, ThemeText],
  templateUrl: './login-page.html',
  styles: ``,
})
export class LoginPage {

  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  myForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    password: ["", [Validators.required]],
  });
  formUtils = FormUtils;
  emailMessages = this.formUtils.getPatternMessage('El correo no tiene un formato válido');
  loginMutation = this._authService.login;
  errorMessage = this._authService.errorMessage;
  private router = inject(Router);
  async onsubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    try {
      await this.loginMutation.mutateAsync({
        email: this.myForm.controls['email'].value,
        password: this.myForm.controls['password'].value,
      });
      this.router.navigateByUrl('/admin', { replaceUrl: true });
      this.myForm.reset({ email: '', password: '' });
    } catch (err) {
      console.log(err);
    }
  }
}
