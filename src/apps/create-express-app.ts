import { Knex } from "knex";
import express from "express";
import { createUserRoute } from "src/infrastructure/express/route/user.route";
import { UserRepositoryImpl } from "src/infrastructure/database/repository-implement/user-repository.implement";
import { UserService } from "src/domain/service/user";
import { GetUserUseCase } from "src/usecase/get-user/get-user-usercase";
import { CreateUserUseCase } from "src/usecase/create-user/create-user-usecase";
import { UserController } from "src/infrastructure/express/controller/user.controller";
import { errorHandlerMiddleware } from "src/infrastructure/express/middleware/error-handler-middleware";

export function createApp(params: { connection: Knex }) {
  const app = express();

  const userRepository = new UserRepositoryImpl(params.connection);
  const userService = new UserService(userRepository);
  const getUserUsecase = new GetUserUseCase(userService);
  const createUserUseCase = new CreateUserUseCase(userService);
  const userControler = new UserController(createUserUseCase, getUserUsecase);

  app.get("/", (req, res) => {
    res.json({
      success: true,
      message: "Hello world",
    });
  });
  app.use("/user", createUserRoute({ userControler }));
  app.use(errorHandlerMiddleware);

  return app;
}
