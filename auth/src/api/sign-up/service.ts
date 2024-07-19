import { DuplicateEmail } from "@lib/errors";
import { db, usersTable } from "@lib/utils";
import { BaseError } from "@shared/core";
import { InternalServerError } from "@shared/errors";
import { eq, InferInsertModel } from "drizzle-orm";

export class SignupService {
  findOneByEmail = async (email: string) => {
    try {
      const user = await db
        .select({ id: usersTable.id, email: usersTable.email })
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .then((result) => result[0]);

      if (!user) {
        return null;
      }

      return user;
    } catch (error: any) {
      if (error instanceof BaseError) {
        throw error;
      } else {
        throw new InternalServerError(
          `FindOneByEmail Error: ${error?.message}`
        );
      }
    }
  };
  createOne = async (user: InferInsertModel<typeof usersTable>) => {
    try {
      const existingUser = await this.findOneByEmail(user.email);

      if (existingUser) {
        throw new DuplicateEmail();
      }

      await db.insert(usersTable).values(user);
    } catch (error: any) {
      if (error instanceof BaseError) {
        throw error;
      } else {
        throw new InternalServerError(`CreateOne Error: ${error?.message}`);
      }
    }
  };
}
