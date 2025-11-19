import { corePhraseFields, PhraseAttributes } from "../entities";
import { PhrasesRepository } from "../repository";
import { inject, Injectable } from "@angular/core";

interface Phrases {
    execute(corePhraseFields: corePhraseFields): Promise<PhraseAttributes>;
}
@Injectable({ providedIn: 'root' })
export class CreatePhraseUseCase implements Phrases {
    private readonly repository = inject(PhrasesRepository);
    async execute(corePhraseFields: corePhraseFields): Promise<PhraseAttributes> {
        return this.repository.savePhrase(corePhraseFields);
    }
}