import {
  GetObjectCommand,
  GetObjectCommandOutput,
  ListBucketsCommand,
  ListBucketsCommandOutput,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client
} from "@aws-sdk/client-s3";
import {Endpoint, Region} from "../../main/config/storage.config";
import { IStorage } from '../interfaces/i-storage.interface';
import { injectable } from 'inversify';

@injectable()
export class StorageService implements IStorage {
  private storage: S3Client;

  constructor() {
    this.storage = new S3Client([{
      region: Region,
      endpoint: Endpoint
    }]);
  }

  async get(key: string, bucket: string) {
    const command = new GetObjectCommand({
      Key: key,
      Bucket: bucket
    })

    const response = await this.storage.send<GetObjectCommand, GetObjectCommandOutput>(command)
    return (await response.Body!.transformToString())
  }

  async put(key: string, bucket: string, data: string) {
    const command = new PutObjectCommand({
      Key: key,
      Bucket: bucket,
      Body: data
    })

    const response = await this.storage.send<PutObjectCommand, PutObjectCommandOutput>(command)
    return (await response.$metadata.httpStatusCode)
  }

  async listBuckets() {
    const command = new ListBucketsCommand({})

    const response = await this.storage.send<ListBucketsCommand, ListBucketsCommandOutput>(command)
    return (await response.Buckets)
  }
}