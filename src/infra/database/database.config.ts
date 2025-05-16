import {createConnection} from 'mysql2/promise'

export class Database {
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