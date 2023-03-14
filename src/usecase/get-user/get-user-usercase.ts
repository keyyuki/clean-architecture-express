import { User } from "src/domain/entity";
import { UserService } from "src/domain/service/user";

export class GetUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(id: string): Promise<User> {
    const user = await this.userService.getUserById(id);
    return user;
  }
}
