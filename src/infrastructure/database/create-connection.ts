import { knex } from "knex";

export function createConnection(dbUrl: string) {
  return knex(dbUrl);
}
