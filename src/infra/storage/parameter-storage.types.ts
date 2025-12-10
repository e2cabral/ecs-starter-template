export type DatabaseConfig = {
  host: string;
  user: string;
  password: string;
  name: string;
};

export type CacheConfig = Omit<DatabaseConfig, 'name'> & { port: string };

export type AIConfig = {
  key: string;
  bucket: string;
};

export type AIFileConfig = {
  file: string;
  assistant: string;
};

export type PaymentsConfig = {
  key: string;
  secretKey: string;
};

export type AuthConfig = {
  clientId: string;
  secretHash: string;
  userPoolId: string;
};