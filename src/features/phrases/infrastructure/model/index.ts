import { Pagination } from "@common/interfaces";

export interface PhrasesModelResponse {
    phrases: PhraseModelResponse[];
    pagination: Pagination;
}

export interface PhraseModelResponse {
    id: number;
    text: string;
    color: string;
}
