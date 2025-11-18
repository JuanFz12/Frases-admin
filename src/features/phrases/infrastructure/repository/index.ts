import { Pagination, PaginationParams } from "@common/interfaces";
import { PhraseAttributes, corePhraseFields, PhraseUpdate } from "../../domain/entities";
import { PhrasesRepository } from "../../domain/repository";
import { inject } from "@angular/core";
import { PhrasesDataSource } from "../../domain/datasource";

export class PhrasesRepositoryImpl implements PhrasesRepository {
    private readonly datasource = inject(PhrasesDataSource)
    async getPhrases(paginationParams: PaginationParams): Promise<{ pagination: Pagination; phrases: PhraseAttributes[]; }> {
        return this.datasource.getPhrases(paginationParams);
    }
    async savePhrase(phrase: corePhraseFields): Promise<PhraseAttributes> {
        return this.datasource.savePhrase(phrase);
    }
    async deletePhrase(phraseId: number): Promise<void> {
        return this.datasource.deletePhrase(phraseId);
    }
    async updatePhrase(phraseId: number, newPhrase: PhraseUpdate): Promise<PhraseAttributes> {
        return this.datasource.updatePhrase(phraseId, newPhrase);
    }
    async getPhraseById(phraseId: number): Promise<PhraseAttributes> {
        return this.datasource.getPhraseById(phraseId);
    }
}