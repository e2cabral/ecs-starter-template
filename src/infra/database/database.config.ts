import {createConnection} from 'mysql2/promise'
import { IDatabase } from '../interfaces/i-database.interface';
import { injectable } from 'inversify';

@injectable()
export class Database implements IDatabase {
  public connection: any;

  constructor() {
  }

  async getConnection(host: string, user: string, password: string, database: string) {
    this.connection = await createConnection({
      host,
      user,
      password,
      database,
      multipleStatements: true,
      namedPlaceholders: true,
    });
  }
}