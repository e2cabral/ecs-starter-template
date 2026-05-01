import { Pool, PoolClient } from 'pg';
import { IDatabase } from '../interfaces/i-database.interface.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../container/types.container.js';
import { IParameterStorageService } from '../storage/interfaces/i-paramenter-storage.service.js';

@injectable()
export class Database implements IDatabase {
  public connection!: Pool;
  private connectionPromise?: Promise<Pool>;

  constructor(
    @inject(TYPES.Infrastructure.ParameterStorage)
    private readonly parameterStorage: IParameterStorageService,
  ) {
  }

  private async ensureConnection(): Promise<Pool> {
    if (this.connection) {
      return this.connection;
    }

    if (!this.connectionPromise) {
      this.connectionPromise = this.parameterStorage
        .getDatabaseParameters()
        .then(({ host, user, password, name }) => {
          this.connection = new Pool({
            host,
            user,
            password,
            database: name,
          });

          return this.connection;
        });
    }

    return this.connectionPromise;
  }

  async getConnection(): Promise<Pool> {
    return this.ensureConnection();
  }

  async connect(): Promise<PoolClient> {
    const connection = await this.ensureConnection();
    return connection.connect();
  }

  async closeConnection(): Promise<void> {
    const connection = await this.ensureConnection();
    await connection.end();
  }
}
