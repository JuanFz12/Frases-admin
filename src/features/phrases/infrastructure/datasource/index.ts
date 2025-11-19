import { BackendResponse, Pagination, PaginationParams } from '@common/interfaces';
import { PhrasesDataSource } from '../../domain/datasource';
import { PhraseAttributes, corePhraseFields, PhraseUpdate, Phrase } from '../../domain/entities';
import { environment } from 'src/environments/environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { HttpApiError, unwrapResponse } from '@common/helpers';
import { PhraseModelResponse, PhrasesModelResponse } from '../model';
const baseUrl = environment.apiUrl;

@Injectable()
export class PhrasesDataSourceImpl implements PhrasesDataSource {
    private http = inject(HttpClient);
    async getPhrases({ limit, page }: PaginationParams): Promise<{ pagination: Pagination; phrases: PhraseAttributes[]; }> {
        try {
            const response = await firstValueFrom(
                unwrapResponse(
                    this.http.get<BackendResponse<PhrasesModelResponse>>(`${baseUrl}/phrases`, {
                        params: { limit, page },
                    })
                ).pipe(map((res) => ({ phrases: res.phrases.map((phrase) => Phrase.toJson(phrase)), pagination: res.pagination })))
            );
            return { pagination: response.pagination, phrases: response.phrases };
        } catch (err: any) {
            const message = `${err.error.message} Reason: ${err.error.error}`;
            const status =
                err?.status ??
                err?.statusCode ??
                err?.response?.status ??
                err?.error?.status ??
                500;
            throw new HttpApiError(status, message);
        }
    }
    async savePhrase(phrase: corePhraseFields): Promise<PhraseAttributes> {
        try {
            const response = await firstValueFrom(
                unwrapResponse(
                    this.http.post<BackendResponse<PhraseModelResponse>>(`${baseUrl}/phrases`, phrase)
                ).pipe(map((phrase) => (Phrase.toJson(phrase))))
            );
            return response;
        } catch (err: any) {
            const message = `${err.error.message} Reason: ${err.error.error}`;
            const status =
                err?.status ??
                err?.statusCode ??
                err?.response?.status ??
                err?.error?.status ??
                500;
            throw new HttpApiError(status, message);
        }
    }
    async deletePhrase(phraseId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async updatePhrase(phraseId: number, newPhrase: PhraseUpdate): Promise<PhraseAttributes> {
        throw new Error('Method not implemented.');
    }
    async getPhraseById(phraseId: number): Promise<PhraseAttributes> {
        throw new Error('Method not implemented.');
    }

}