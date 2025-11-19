import { computed, inject, Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginationService } from '@common/services';
import { GetUsersUsecase } from '@features/users';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';

@Injectable()
export class UsersService {
  //*Injections
  private readonly getUsers = inject(GetUsersUsecase);

  queryClient = inject(QueryClient);
  paginationService = inject(PaginationService);

  //*Pagination
  page = this.paginationService.currentPage;
  limit = this.paginationService.currentLimit;
  totalItems = computed(() => this.query.data()?.pagination.totalPages ?? 0);
  onPageChange(event: PageEvent) {
    this.paginationService.setQueryParams({
      page: event.pageIndex + 1,
      limit: event.pageSize,
    });
  }

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
