import { Component, inject } from '@angular/core';
import { ThemedInput } from "../../../common/theme/theme-input/theme-input";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ThemeButton } from "../../../common/theme/theme-button/theme-button";
import { ThemeText } from "../../../common/theme/theme-text/theme-text";
import { FormUtils } from '../../../common/helpers/form-utils';

@Component({
  selector: 'app-login-page',
  imports: [ThemedInput, ReactiveFormsModule, ThemeButton, ThemeText,],
  templateUrl: './login-page.html',
  styles: ``,
})
export class LoginPage {

  private _fb = inject(FormBuilder);
  myForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    password: ["", [Validators.required]],
  });
  formUtils = FormUtils;
  emailMessages = this.formUtils.getPatternMessage('El correo no tiene un formato válido');


  onsubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value)
    this.myForm.reset({ phrase: '', color: '' });

  }
}
