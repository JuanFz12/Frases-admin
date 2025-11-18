export interface PhraseAttributes {
    id: number;
    text: string;
    color: string;
}

export class Phrase {
    readonly id: number;
    readonly text: string;
    readonly color: string;

    constructor(props: PhraseAttributes) {
        this.id = props.id;
        this.text = props.text;
        this.color = props.color;
    }
    static toJson(user: PhraseAttributes) {
        return {
            id: user.id,
            text: user.text,
            color: user.color,
        };
    }
}
export type corePhraseFields = Omit<PhraseAttributes, 'id'>;

export type PhraseUpdate = Partial<corePhraseFields>;