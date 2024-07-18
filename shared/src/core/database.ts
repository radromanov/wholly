import postgres, { Sql } from "postgres";

export class Database {
  private static instance: Database;
  private static url: string;
  private static adminUrl: string;
  private connection: Sql<{}>;
  private adminConnection: Sql<{}>;

  private constructor() {
    Database.url = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_NAME}`;
    Database.adminUrl = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/postgres`;

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
