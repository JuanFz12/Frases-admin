import { inject, Injectable } from "@angular/core";
import { CreateUser, User } from "@common/interfaces";
import { UsersRepository } from "../repository";

interface Users {
    execute(createUser: CreateUser): Promise<User>;
}
@Injectable({ providedIn: 'root' })
export class CreateUserUsecase implements Users {
    private readonly repository = inject(UsersRepository);
    async execute(createUser: CreateUser): Promise<User> {
        return this.repository.createUser(createUser);
    }
}