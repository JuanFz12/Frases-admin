import { computed, inject, Injectable } from '@angular/core';
import { PaginationService } from '@common/services';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { PageEvent } from '@angular/material/paginator';
import { GetPhrasesUseCase } from 'src/features/phrases/domain';

@Injectable()
export class PhrasesService {
  //*Injections
  private readonly getPhrases = inject(GetPhrasesUseCase);

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
    queryKey: ['phrases', this.page(), this.limit()],
    queryFn: () => this.getPhrases.execute({
      page: this.page(),
      limit: this.limit(),
    }),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  }))
}
