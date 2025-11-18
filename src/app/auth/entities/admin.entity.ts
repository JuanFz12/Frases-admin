import { User } from "@common/interfaces";

export class AdminEntity {
    readonly id: number;
    readonly name: string;
    readonly status: string;
    readonly email: string;

    constructor(props: User) {
        this.id = props.id;
        this.name = props.name;
        this.status = props.status;
        this.email = props.email;
    }
    static toJson(user: User) {
        return {
            id: user.id,
            name: user.name,
            status: user.status,
            email: user.email,
        };
    }
}