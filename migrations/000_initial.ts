import { Migration } from "./mod.ts";
import db from "../database.ts";

export default class InitialMigration implements Migration {
  async upgrade() {
  }

  async downgrade() {
  }
}
