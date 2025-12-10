import { injectable } from 'inversify';
import {
  GetParametersCommand,
  SSMClient,
} from '@aws-sdk/client-ssm';
import {
  AIFileParametersKeys,
  AIParamentersKeys,
  AuthParametersKeys,
  CacheParametersKeys,
  DatabaseParametersKeys,
  PaymentsParametersKeys,
} from './parameters.keys';
import {
  AIConfig,
  AIFileConfig,
  AuthConfig,
  CacheConfig,
  DatabaseConfig,
  PaymentsConfig,
} from './parameter-storage.types';
import { IParameterStorageService } from './interfaces/i-paramenter-storage.service';

@injectable()
export class ParameterStorageService implements IParameterStorageService {
  private client: SSMClient;

  constructor(region: string = 'us-east-1') {
    this.client = new SSMClient({ region });
  }

  private async getParameters(
    names: string[],
  ): Promise<Record<string, string>> {
    const parameters = await this.client.send(
      new GetParametersCommand({ Names: names }),
    );

    const result: Record<string, string> = {};

    parameters.Parameters!.forEach((parameter) => {
      if (!parameter) return;
      result[String(parameter.Name)] = parameter.Value ?? '';
    });

    return result;
  }

  public async getDatabaseParameters(): Promise<DatabaseConfig> {
    const parameters = await this.getParameters([
      DatabaseParametersKeys.host,
      DatabaseParametersKeys.user,
      DatabaseParametersKeys.password,
      DatabaseParametersKeys.name,
    ]);

    return {
      host: parameters[DatabaseParametersKeys.host],
      user: parameters[DatabaseParametersKeys.user],
      password: parameters[DatabaseParametersKeys.password],
      name: parameters[DatabaseParametersKeys.name],
    };
  }

  public async getCacheParameters(): Promise<CacheConfig> {
    const parameters = await this.getParameters([
      CacheParametersKeys.host,
      CacheParametersKeys.port,
      CacheParametersKeys.password,
      CacheParametersKeys.user,
    ]);

    return {
      host: parameters[CacheParametersKeys.host],
      port: parameters[CacheParametersKeys.port],
      password: parameters[CacheParametersKeys.password],
      user: parameters[CacheParametersKeys.user],
    };
  }

  public async getAIParameters(): Promise<AIConfig> {
    const parameters = await this.getParameters([
      AIParamentersKeys.key,
      AIParamentersKeys.bucket,
    ]);

    return {
      key: parameters[AIParamentersKeys.key],
      bucket: parameters[AIParamentersKeys.bucket],
    };
  }

  public async getAIFileParameters(): Promise<AIFileConfig> {
    const parameters = await this.getParameters([
      AIFileParametersKeys.file,
      AIFileParametersKeys.assistant,
    ]);

    return {
      file: parameters[AIFileParametersKeys.file],
      assistant: parameters[AIFileParametersKeys.assistant],
    };
  }

  public async getPaymentsParameters(): Promise<PaymentsConfig> {
    const parameters = await this.getParameters([
      PaymentsParametersKeys.key,
      PaymentsParametersKeys.secretKey,
    ]);

    return {
      key: parameters[PaymentsParametersKeys.key],
      secretKey: parameters[PaymentsParametersKeys.secretKey],
    };
  }

  public async getAuthParameters(): Promise<AuthConfig> {
    const parameters = await this.getParameters([
      AuthParametersKeys.clientId,
      AuthParametersKeys.secretHash,
      AuthParametersKeys.userPoolId,
    ]);

    return {
      clientId: parameters[AuthParametersKeys.clientId],
      secretHash: parameters[AuthParametersKeys.secretHash],
      userPoolId: parameters[AuthParametersKeys.userPoolId],
    };
  }
}