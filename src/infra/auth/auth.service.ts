import { IAuthService } from './interfaces/i-auth.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../container/types.container';
import { ParameterStorageService } from '../storage/parameter-storage.service';
import * as auth from 'jose';

@injectable()
export class AuthService implements IAuthService {
  constructor(@inject(TYPES.Infrastructure.ParameterStorage) private parameterStorage: ParameterStorageService) { }

  async decode(token: string): Promise<DecodedToken | null> {
    const cleanToken = token.replace('Bearer ', '')

    if (!cleanToken) return null

    const { userPoolId } = await this.parameterStorage.getAuthParameters();

    const jwksUrl = `https://cognito-idp.us-east-1.amazonaws.com/${userPoolId}/.well-known/jwks.json`;
    const remoteJwkSet = auth.createRemoteJWKSet(new URL(jwksUrl));

    const { payload, protectedHeader } = await auth.jwtVerify(
      cleanToken,
      remoteJwkSet,
      { issuer: `https://cognito-idp.us-east-1.amazonaws.com/${userPoolId}` },
    );

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expirado');
    }


    return {
      payload: payload as TokenPayload,
      header: protectedHeader
    }
  }

  public getUserId(payload: TokenPayload): string {
    return payload.sub;
  }
}

export interface DecodedToken {
  payload: TokenPayload;
  header: auth.JWTHeaderParameters;
}

export interface TokenPayload {
  sub: string;
  email?: string;
  email_verified?: boolean;
  'cognito:username'?: string;
  'cognito:groups'?: string[];
  iat: number;
  exp: number;
  token_use?: string;
  [key: string]: unknown;
}
