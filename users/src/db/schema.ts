import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable('user', {
  id: varchar({ length: 255 }).primaryKey(),
  email: varchar({ length: 255 }).unique(),
  password: varchar({ length: 255 }).notNull(),
});
