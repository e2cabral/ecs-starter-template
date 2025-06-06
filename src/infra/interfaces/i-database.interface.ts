export interface IDatabase {
  connection: any;

  getConnection(host: string, user: string, password: string, database: string): Promise<void>;
}
