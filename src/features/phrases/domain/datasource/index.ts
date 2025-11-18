import { Pagination, PaginationParams } from "@common/interfaces";
import { corePhraseFields, PhraseAttributes, PhraseUpdate } from "../entities";

export abstract class PhrasesDataSource {
    abstract getPhrases(paginationParams: PaginationParams): Promise<{ pagination: Pagination, phrases: PhraseAttributes[] }>;
    abstract savePhrase(phrase: corePhraseFields): Promise<PhraseAttributes>;
    abstract deletePhrase(phraseId: number): Promise<void>;
    abstract updatePhrase(phraseId: number, newPhrase: PhraseUpdate): Promise<PhraseAttributes>;
    abstract getPhraseById(phraseId: number): Promise<PhraseAttributes>;
}