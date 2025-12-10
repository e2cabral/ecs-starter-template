import { HTTPStatus } from './protocols.http';

export const ok = (data: unknown) => {
  return {
    statusCode: HTTPStatus.OK,
    body: JSON.stringify(data),
  };
};
export const created = (data: unknown) => {
  return {
    statusCode: HTTPStatus.CREATED,
    body: JSON.stringify(data),
  };
};
export const accepted = (data: unknown) => {
  return {
    statusCode: HTTPStatus.ACCEPTED,
    body: JSON.stringify(data),
  };
};
export const noContent = () => {
  return {
    statusCode: HTTPStatus.NO_CONTENT,
    body: '',
  };
};
export const movedPermanently = (data: unknown) => {
  return {
    statusCode: HTTPStatus.MOVED_PERMANENTLY,
    body: JSON.stringify(data),
  };
};
export const found = (data: unknown) => {
  return {
    statusCode: HTTPStatus.FOUND,
    body: JSON.stringify(data),
  };
};
export const seeOther = (data: unknown) => {
  return {
    statusCode: HTTPStatus.SEE_OTHER,
    body: JSON.stringify(data),
  };
};
export const notModified = () => {
  return {
    statusCode: HTTPStatus.NOT_MODIFIED,
    body: '',
  };
};
export const temporaryRedirect = (data: unknown) => {
  return {
    statusCode: HTTPStatus.TEMPORARY_REDIRECT,
    body: JSON.stringify(data),
  };
};
export const permanentRedirect = (data: unknown) => {
  return {
    statusCode: HTTPStatus.PERMANENT_REDIRECT,
    body: JSON.stringify(data),
  };
};
export const badRequest = (data: unknown) => {
  return {
    statusCode: HTTPStatus.BAD_REQUEST,
    body: JSON.stringify(data),
  };
};
export const unauthorized = (data: unknown) => {
  return {
    statusCode: HTTPStatus.UNAUTHORIZED,
    body: JSON.stringify(data),
  };
};
export const forbidden = (data: unknown) => {
  return {
    statusCode: HTTPStatus.FORBIDDEN,
    body: JSON.stringify(data),
  };
};
export const notFound = (data: unknown) => {
  return {
    statusCode: HTTPStatus.NOT_FOUND,
    body: JSON.stringify(data),
  };
};
export const methodNotAllowed = (data: unknown) => {
  return {
    statusCode: HTTPStatus.METHOD_NOT_ALLOWED,
    body: JSON.stringify(data),
  };
};
export const conflict = (data: unknown) => {
  return {
    statusCode: HTTPStatus.CONFLICT,
    body: JSON.stringify(data),
  };
};
export const unprocessableEntity = (data: unknown) => {
  return {
    statusCode: HTTPStatus.UNPROCESSABLE_ENTITY,
    body: JSON.stringify(data),
  };
};
export const tooManyRequests = (data: unknown) => {
  return {
    statusCode: HTTPStatus.TOO_MANY_REQUESTS,
    body: JSON.stringify(data),
  };
};
export const internalServerError = (data: unknown) => {
  return {
    statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
    body: JSON.stringify(data),
  };
};
export const notImplemented = (data: unknown) => {
  return {
    statusCode: HTTPStatus.NOT_IMPLEMENTED,
    body: JSON.stringify(data),
  };
};
export const badGateway = (data: unknown) => {
  return {
    statusCode: HTTPStatus.BAD_GATEWAY,
    body: JSON.stringify(data),
  };
};
export const serviceUnavailable = (data: unknown) => {
  return {
    statusCode: HTTPStatus.SERVICE_UNAVAILABLE,
    body: JSON.stringify(data),
  };
};
export const gatewayTimeout = (data: unknown) => {
  return {
    statusCode: HTTPStatus.GATEWAY_TIMEOUT,
    body: JSON.stringify(data),
  };
};
