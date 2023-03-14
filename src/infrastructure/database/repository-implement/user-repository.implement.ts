import { UserRepository } from "src/domain/repository/user-repository";
import { Knex } from "knex";
import { User } from "src/domain/entity";
import { plainToClass } from "class-transformer";

const TABLE_USER = "user";
export class UserRepositoryImpl implements UserRepository {
  constructor(private connection: Knex) {}

  async create(user: User): Promise<User> {
    const { id, ...insertRecord } = user;
    const newId = await this.connection.table(TABLE_USER).insert(insertRecord);

    user.id = newId[0];
    return user;
  }

  async getById(id: number): Promise<User> {
    const raw = await this.connection
      .table(TABLE_USER)
      .where("id", "=", id)
      .first();
    const user = plainToClass(User, raw, { excludeExtraneousValues: false });
    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const raw = await this.connection
      .table(TABLE_USER)
      .where("email", "=", email)
      .first();
    const user = plainToClass(User, raw, { excludeExtraneousValues: false });
    return user;
  }

  async update(user: User): Promise<void> {
    const { id, ...updatePath } = user;
    await this.connection
      .table(TABLE_USER)
      .where("id", "=", id)
      .update(updatePath);
    return;
  }

  async delete(id: number): Promise<void> {
    await this.connection.table(TABLE_USER).where("id", "=", id).delete();
    return;
  }
}
