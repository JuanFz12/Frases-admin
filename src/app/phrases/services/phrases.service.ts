import { computed, inject, Injectable, signal } from '@angular/core';
import { PaginationService } from '@common/services';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { PageEvent } from '@angular/material/paginator';
import { corePhraseFields, CreatePhraseUseCase, GetPhrasesUseCase } from 'src/features/phrases/domain';
import { HttpApiError } from '@common/helpers';

@Injectable()
export class PhrasesService {
  //*Injections
  private readonly getPhrases = inject(GetPhrasesUseCase);
  private readonly createPhrase = inject(CreatePhraseUseCase);

  queryClient = inject(QueryClient);
  paginationService = inject(PaginationService);
  private _errorMessage = signal<{ message: string, status: number } | null>(null);

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
    mutationFn: (credentials: corePhraseFields) =>
      this.createPhrase.execute(credentials),
    onSuccess: (resp) => {
      console.log('✅ Phrase created', resp);
      this.queryClient.invalidateQueries();
    },
    onError: (err: HttpApiError) => {
      this._errorMessage.set({
        message: err.message ?? 'Error creating phrase',
        status: err.status ?? 400,
      });
      console.error('❌ Error creating phrase', err.message);
    }
  }));

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
