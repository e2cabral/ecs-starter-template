import { Pool } from 'pg';
import { IDatabase } from '../interfaces/i-database.interface';
import { injectable } from 'inversify';

@injectable()
export class Database implements IDatabase {
  public connection: Pool;

  constructor(host: string, user: string, password: string, database: string) {
    this.connection = new Pool({
      host,
      user,
      password,
      database,
    });
  }

  async getConnection() {
    return this.connection;
  }

  async connect() {
    return this.connection.connect();
  }

  async closeConnection() {
    this.connection.end();
  }
}