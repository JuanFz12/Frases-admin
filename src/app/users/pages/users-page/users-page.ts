import { Component, inject } from '@angular/core';
import { ScreenHeader } from "@dashboard/components/screen-header/screen-header";
import { CreateUserUsecase, GetUsersUsecase, UpdateUserUsecase, UsersDataSource, UsersDatasourceImpl, UsersRepository, UsersRepositoryImpl } from '@features/users';
import { UsersService } from '@users/services/users.service';
import { ProgressSpinner, TableLayout, TableRow } from "@common/components";
import { ThemeText } from "@common/theme";
import { MatPaginator } from "@angular/material/paginator";
import { ModalService } from '@common/services/modal.service';
import { CreateUser } from '@users/components/create-user/create-user';
import { User } from '@common/interfaces';

@Component({
  selector: 'users-page',
  imports: [ScreenHeader, ProgressSpinner, TableLayout, ThemeText, MatPaginator, TableRow],
  templateUrl: './users-page.html',
  styles: ``,
  providers: [
    { provide: UsersDataSource, useClass: UsersDatasourceImpl },
    { provide: UsersRepository, useClass: UsersRepositoryImpl },
    GetUsersUsecase,
    CreateUserUsecase,
    UpdateUserUsecase,
    UsersService
  ]
})
export class UsersPage {
  usersService = inject(UsersService);
  private _columns = [
    { key: 'status', label: 'Estado' },
    { key: 'name', label: 'Nombre de usuario' },
    { key: 'email', label: 'Correo electrónico' },
    { key: 'management', label: '' },
  ];
  headers = this._columns.map(c => c.label);
  private modalService = inject(ModalService);
  openCreateModal() {
    this.modalService.open({
      title: 'Crear Usuario',
      width: '600px',
      component: CreateUser,
    });
  }
  openEditModal(user: User) {
    console.log({ user })
    this.modalService.open({
      title: 'Editar Usuario',
      width: '600px',
      component: CreateUser,
      data: user,
    });
  }
}
