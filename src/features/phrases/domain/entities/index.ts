export interface PhraseAttributes {
    id: number;
    text: string;
    color: string;
    updatedAt: Date;
}

export class Phrase {
    readonly id: number;
    readonly text: string;
    readonly color: string;
    readonly updatedAt: Date;

    constructor(props: PhraseAttributes) {
        this.id = props.id;
        this.text = props.text;
        this.color = props.color;
        this.updatedAt = props.updatedAt;
    }
    static toJson(user: PhraseAttributes) {
        return {
            id: user.id,
            text: user.text,
            color: user.color,
            updatedAt: new Date(user.updatedAt),
        };
    }
}
export type corePhraseFields = Omit<PhraseAttributes, 'id' | 'updatedAt'>;

export type PhraseUpdate = Partial<corePhraseFields>;