import {
  AIConfig,
  AIFileConfig,
  AuthConfig,
  CacheConfig,
  DatabaseConfig,
  PaymentsConfig,
} from '../parameter-storage.types';

export interface IParameterStorageService {
  getDatabaseParameters(): Promise<DatabaseConfig>;
  getCacheParameters(): Promise<CacheConfig>;
  getAIParameters(): Promise<AIConfig>;
  getAIFileParameters(): Promise<AIFileConfig>;
  getPaymentsParameters(): Promise<PaymentsConfig>;
  getAuthParameters(): Promise<AuthConfig>;
}