import {StatusCodes, getReasonPhrase} from 'http-status-codes';

export class OsomError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export class NotImplementedError extends OsomError {
  constructor(message?: string, options?: ErrorOptions) {
    super(message ?? 'Not implemented', options);
  }
}

export class InaccessibleSectionError extends OsomError {
  constructor(message?: string, options?: ErrorOptions) {
    super(message ?? 'Inaccessible section', options);
  }
}

export function getReasonPhraseSafe(code: number | string) {
  try {
    return getReasonPhrase(code);
  } catch {
    return `Unsupported status code ${code}`;
  }
}

export class HttpStatusError extends OsomError {
  code: number;

  constructor(code: number, message?: string, options?: ErrorOptions) {
    super(message ?? getReasonPhraseSafe(code), options);
    this.code = code;
  }

  get reason() {
    return getReasonPhraseSafe(this.code);
  }
}

export class BadRequestError extends HttpStatusError {
  constructor(message?: string, options?: ErrorOptions) {
    super(StatusCodes.BAD_REQUEST, message, options);
  }
}

export class UnauthorizedError extends HttpStatusError {
  constructor(message?: string, options?: ErrorOptions) {
    super(StatusCodes.UNAUTHORIZED, message, options);
  }
}
