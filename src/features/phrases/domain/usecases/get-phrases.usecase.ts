import { Pagination, PaginationParams } from "@common/interfaces";
import { PhraseAttributes } from "../entities";
import { PhrasesRepository } from "../repository";
import { inject, Injectable } from "@angular/core";

interface Phrases {
    execute(paginationParams: PaginationParams): Promise<{ pagination: Pagination, phrases: PhraseAttributes[] }>;
}
@Injectable({ providedIn: 'root' })
export class GetPhrasesUseCase implements Phrases {
    private readonly repository = inject(PhrasesRepository);
    async execute(paginationParams: PaginationParams): Promise<{ pagination: Pagination, phrases: PhraseAttributes[] }> {
        return this.repository.getPhrases(paginationParams);
    }
}