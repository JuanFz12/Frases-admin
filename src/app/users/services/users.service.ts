import { computed, inject, Injectable, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { HttpApiError } from '@common/helpers/custom-error';
import { CreateUser } from '@common/interfaces';
import { PaginationService } from '@common/services';
import { CreateUserUsecase, GetUsersUsecase, UpdateUserUsecase } from '@features/users';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';

@Injectable()
export class UsersService {
  //*Injections
  private readonly getUsers = inject(GetUsersUsecase);
  private readonly createUser = inject(CreateUserUsecase);
  private readonly updateUser = inject(UpdateUserUsecase);

  private _errorMessage = signal<{ message: string, status: number } | null>(null);

  queryClient = inject(QueryClient);
  paginationService = inject(PaginationService);

  errorMessage = computed(this._errorMessage);
  //*Pagination
  page = this.paginationService.currentPage;
  limit = this.paginationService.currentLimit;
  /* totalItems = computed(() => this.query.data()?.pagination.totalPages ?? 0); */
  totalItems = computed(() => {
    const pagination = this.query.data()?.pagination;
    if (!pagination) return 0;

    return pagination.totalPages * pagination.limit;
  });
  onPageChange(event: PageEvent) {
    this.paginationService.setQueryParams({
      page: event.pageIndex + 1,
      limit: event.pageSize,
    });
  }
  //*Queries
  create = injectMutation(() => ({
    mutationFn: (credentials: CreateUser) =>
      this.createUser.execute(credentials),
    onSuccess: (resp) => {
      console.log('✅ User created', resp);
      this.queryClient.invalidateQueries();
    },
    onError: (err: HttpApiError) => {
      this._errorMessage.set({
        message: err.message ?? 'Error creating user',
        status: err.status ?? 400,
      });
      console.error('❌ Error creating user', err.message);
    }
  }));
  update = injectMutation(() => ({
    mutationFn: (credentials: { id: number, user: Partial<CreateUser> }) => {
      console.log({credentials})
      return this.updateUser.execute(credentials.id, credentials.user)
    },
    onSuccess: (resp) => {
      console.log('✅ User updated', resp);
      this.queryClient.invalidateQueries();
    },
    onError: (err: HttpApiError) => {
      this._errorMessage.set({
        message: err.message ?? 'Error updating user',
        status: err.status ?? 400,
      });
      console.error('❌ Error updating user', err.message);
    }
  }));
  query = injectQuery(() => ({
    queryKey: ['users', this.page(), this.limit()],
    queryFn: () => this.getUsers.execute({
      page: this.page(),
      limit: this.limit(),
    }),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  }))
}
