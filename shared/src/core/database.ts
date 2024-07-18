import postgres, { Sql } from "postgres";
import { Config } from "./config";
import z from "zod";

const envSchema = z.object({
  POSTGRES_PORT: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_NAME: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
});

export class Database {
  private static instance: Database;
  private static url: string;
  private static adminUrl: string;
  private connection: Sql<{}>;
  private adminConnection: Sql<{}>;

  private constructor() {
    const {
      POSTGRES_USER,
      POSTGRES_PASSWORD,
      POSTGRES_HOST,
      POSTGRES_PORT,
      POSTGRES_NAME,
    } = new Config(envSchema).get();

    Database.url = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_NAME}`;
    Database.adminUrl = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/postgres`;

    this.connection = postgres(Database.url, { max: 1 });
    this.adminConnection = postgres(Database.adminUrl, { max: 1 });
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  sql(): Sql<{}> {
    return this.connection;
  }

  sqlAdmin(): Sql<{}> {
    return this.adminConnection;
  }

  async createDatabase(dbName: string) {
    const dbExists = await this.isDbExists(dbName);

    if (!dbExists) {
      await this.adminConnection`CREATE DATABASE ${this.adminConnection(
        dbName
      )}`;
      console.log(`Database ${dbName} created successfully.`);
    } else {
      console.log(`Database ${dbName} already exists.`);
    }
  }

  async dropDatabase(dbName: string) {
    const dbExists = await this.isDbExists(dbName);

    if (dbExists) {
      await this.adminConnection`DROP DATABASE ${this.adminConnection(dbName)}`;
      console.log(`Database ${dbName} dropped successfully.`);
    } else {
      console.log(`Database ${dbName} doesn't exist.`);
    }
  }

  async close() {
    await this.connection.end();
    await this.adminConnection.end();
  }

  private async isDbExists(dbName: string) {
    const dbExists = await this.adminConnection`
      SELECT 1 FROM pg_database WHERE datname = ${dbName}
    `;

    return dbExists.length > 0 ? true : false;
  }
}
