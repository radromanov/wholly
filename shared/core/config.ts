import z from "zod";

export class Config<T> {
  constructor(private readonly schema: z.ZodSchema<T>) {}

  private init(): T {
    const fromEnv = this.schema.safeParse({
      ...process.env,
    });

    if (!fromEnv.success) {
      throw new Error(
        "Error parsing '.env' file. Check if all environment variables are present in your '.env' file."
      );
    }

    return fromEnv.data;
  }

  get(key?: never): ReturnType<typeof this.init>;
  get<T extends keyof ReturnType<typeof this.init>>(
    key: T
  ): ReturnType<typeof this.init>[T];
  get<T extends keyof ReturnType<typeof this.init>>(key?: T) {
    return key ? this.init()[key] : this.init();
  }
}
