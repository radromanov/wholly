import { db } from "@lib/utils";
import { usersTable } from "@lib/utils/db-schema";
import { eq, InferInsertModel } from "drizzle-orm";

export class SignupService {
  createOne = async (user: InferInsertModel<typeof usersTable>) => {
    try {
      await db.insert(usersTable).values(user);
    } catch (error) {
      console.log("Create One Error:", error);
    }
  };
  deleteOne = async (id: string) => {
    try {
      await db.delete(usersTable).where(eq(usersTable.id, id));
    } catch (error) {
      console.log("Delete One Error:", error);
    }
  };
}
