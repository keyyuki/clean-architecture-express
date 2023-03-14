import { User } from "src/domain/entity";
import { UserService } from "src/domain/service/user";
import { CreateUserInput } from "./create-user-input";
import { CreateUserOutput } from "./create-user-output";

export class CreateUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const user: User = {
      id: 0,

      email: input.email,
      password: input.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createdUser = await this.userService.createUser(user);
    return { user: createdUser };
  }
}
