import { Request, Response } from "express";
import { CreateUserUseCase } from "src/usecase/create-user/create-user-usecase";
import { GetUserUseCase } from "src/usecase/get-user/get-user-usercase";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase
  ) {}

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await this.createUserUseCase.execute({
        email,
        password,
      });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating user" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.getUserUseCase.execute(id);
      if (!user) {
        res.status(404).json({ message: `User with ID ${id} not found` });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting user" });
    }
  }
}
