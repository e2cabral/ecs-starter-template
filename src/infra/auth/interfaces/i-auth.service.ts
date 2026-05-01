import { DecodedToken, TokenPayload } from '../auth.service.js';

export interface IAuthService {
  decode(token: string): Promise<DecodedToken | null>;
  getUserId(payload: TokenPayload): string;
}
