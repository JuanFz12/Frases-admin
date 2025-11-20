import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormUtils } from '@common/helpers';
import { User } from '@common/interfaces';
import { ThemeText, ThemedInput, ThemeButton } from "@common/theme";
import { CreateUserUsecase, GetUsersUsecase, UpdateUserUsecase, UsersDataSource, UsersDatasourceImpl, UsersRepository, UsersRepositoryImpl } from '@features/users';
import { UsersService } from '@users/services/users.service';
export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive'
}
@Component({
  selector: 'app-create-user',
  imports: [ThemeText, ThemedInput, ThemeButton, ReactiveFormsModule],
  templateUrl: './create-user.html',
  styles: ``,
  providers: [
    { provide: UsersDataSource, useClass: UsersDatasourceImpl },
    { provide: UsersRepository, useClass: UsersRepositoryImpl },
    CreateUserUsecase,
    UsersService,
    GetUsersUsecase,
    UpdateUserUsecase
  ]
})
export class CreateUser {
  isEditMode = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { content: User }
  ) {
    if (data?.content) {
      this.isEditMode = true;
      const backendStatus = data.content.status.toLowerCase();
      this.myForm.patchValue({
        email: data.content.email,
        name: data.content.name,
        status: backendStatus === 'activo'
          ? UserStatus.Active
          : UserStatus.Inactive,
      });
    }
  }
  private dialogRef = inject(MatDialogRef<CreateUser>);
  private _fb = inject(FormBuilder);
  private _usersService = inject(UsersService);
  formUtils = FormUtils;
  UserStatus = UserStatus;
  createMutation = this._usersService.create;
  errorMessage = this._usersService.errorMessage;
  myForm: FormGroup = this._fb.group({
    email: ["", [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    password: ['', [Validators.required, Validators.pattern(FormUtils.passwordPattern)]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    status: [UserStatus.Active, [Validators.required]],
  });
  emailMessages = this.formUtils.getPatternMessage('El correo no tiene un formato válido');
  passwordMessages = this.formUtils.getPatternMessage('La frase debe tener al menos 6 caracteres, contener mayúsculas, minúsculas y números');
  close() {
    this.dialogRef.close();
  }
  async save() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    try {
      if (this.isEditMode) {
        const dirtyValues = FormUtils.getDirtyValues(this.myForm);
        await this._usersService.update.mutateAsync({
          id: this.data.content.id,
          user: {
            ...dirtyValues,
            status: dirtyValues.status
              ? this.parseStatus(dirtyValues.status)
              : undefined,
          }
        });
        this.close();
        return;
      }
      await this.createMutation.mutateAsync({
        email: this.myForm.controls['email'].value,
        password: this.myForm.controls['password'].value,
        name: this.myForm.controls['name'].value,
        status: this.parseStatus(this.myForm.controls['status'].value),
      });
      this.myForm.reset({ email: '', password: '', name: '', status: '' });
      this.close();
    } catch (err) {
      console.log(err);
    }
  }
  private parseStatus(status: UserStatus): string {
    return status === UserStatus.Active ? 'ACTIVE' : 'INACTIVE';
  }
}
