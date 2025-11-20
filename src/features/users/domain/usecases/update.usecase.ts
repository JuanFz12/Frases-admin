import { inject, Injectable } from "@angular/core";
import { CreateUser, User } from "@common/interfaces";
import { UsersRepository } from "../repository";

interface Users {
    execute(id: number, user: Partial<CreateUser>): Promise<User>;
}
@Injectable({ providedIn: 'root' })
export class UpdateUserUsecase implements Users {
    private readonly repository = inject(UsersRepository);
    async execute(id: number, user: Partial<CreateUser>): Promise<User> {
        return this.repository.updateUser(id, user);
    }
}