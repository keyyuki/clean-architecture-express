import { Router } from "express";
import { UserController } from "../controller/user.controller";

export function createUserRoute(params: { userControler: UserController }) {
  const router = Router();
  router.post("/", params.userControler.createUser.bind(params.userControler));
  router.get(
    "/:id",
    params.userControler.getUserById.bind(params.userControler)
  );
  return router;
}
