import {
  GetObjectCommandOutput,
  ListBucketsCommandOutput,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';

export interface IStorage {
  get(key: string, bucket: string): Promise<string>;

  put(key: string, bucket: string, data: string): Promise<number | undefined>;

  listBuckets(): Promise<ListBucketsCommandOutput['Buckets']>;
}