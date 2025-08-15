import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { usersTable } from "./db/schema";
import { eq } from "drizzle-orm";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const resolvers = {
  Query: {
    users: async () => db.select().from(usersTable),
    user: async (_: any, { id }: { id: string }) =>
      (await db.select().from(usersTable).where(eq(usersTable.id, id)))[0] ?? null,
  },
  Mutation: {
    register: async (_: any, { email, password }: { email: string; password: string }) => {
      const hashed = await bcrypt.hash(password, 10);
      const id = uuidv4();
      await db.insert(usersTable).values({ id, email, password: hashed }).$returningId();
      return { id, email };
    },
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const user = (await db.select().from(usersTable).where(eq(usersTable.email, email)))[0];
      if (!user) throw new Error("Invalid credentials");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid credentials");

      return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    },
  },
  User: {
    __resolveReference: async (ref: { id: string }) =>
      (await db.select().from(usersTable).where(eq(usersTable.id, ref.id)))[0] ?? null,
  },
};
