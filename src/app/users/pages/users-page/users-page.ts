import { Component, inject } from '@angular/core';
import { ScreenHeader } from "@dashboard/components/screen-header/screen-header";
import { GetUsersUsecase, UsersDataSource, UsersDatasourceImpl, UsersRepository, UsersRepositoryImpl } from '@features/users';
import { UsersService } from '@users/services/users.service';
import { ProgressSpinner, TableLayout, TableRow } from "@common/components";
import { ThemeText } from "@common/theme";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: 'users-page',
  imports: [ScreenHeader, ProgressSpinner, TableLayout, ThemeText, MatPaginator,TableRow],
  templateUrl: './users-page.html',
  styles: ``,
  providers: [
    { provide: UsersDataSource, useClass: UsersDatasourceImpl },
    { provide: UsersRepository, useClass: UsersRepositoryImpl },
    GetUsersUsecase,
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
}
