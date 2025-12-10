import { Pool, PoolClient } from 'pg';

export interface IDatabase {
  connection: Pool;

  getConnection(): Promise<Pool>;
  connect(): Promise<PoolClient>;
  closeConnection(): Promise<void>;
}
