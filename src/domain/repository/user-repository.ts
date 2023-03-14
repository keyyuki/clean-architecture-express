import { User } from "../entity/user";

export interface UserRepository {
  create(user: User): Promise<User>;
  getById(id: number): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  update(user: User): Promise<void>;
  delete(id: number): Promise<void>;
}
