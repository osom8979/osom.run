import {StatusCodes, getReasonPhrase} from 'http-status-codes';

export interface OsomErrorOptions extends ErrorOptions {
  code?: string;
  details?: string;
  hint?: string;
  message?: string;
}

export class OsomError extends Error {
  error: OsomErrorOptions;

  constructor(message?: string, options?: OsomErrorOptions) {
    super(message, options);
    this.error = options ?? {};
  }
}

export class UnsupportedError extends OsomError {
  constructor(message?: string, options?: OsomErrorOptions) {
    super(message ?? 'Unsupported features', options);
  }
}

export class NotImplementedError extends OsomError {
  constructor(message?: string, options?: OsomErrorOptions) {
    super(message ?? 'Not implemented', options);
  }
}

export class InaccessibleSectionError extends OsomError {
  constructor(message?: string, options?: OsomErrorOptions) {
    super(message ?? 'Inaccessible section', options);
  }
}

export class NoUrlError extends OsomError {
  constructor(message?: string, options?: OsomErrorOptions) {
    super(message ?? 'The URL has no attributes', options);
  }
}

export class InvalidTimezoneError extends OsomError {
  constructor(message?: string, options?: OsomErrorOptions) {
    super(message ?? 'Invalid timezone', options);
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
  statusCode: number;

  constructor(code: number, options?: OsomErrorOptions) {
    super(getReasonPhraseSafe(code), options);
    this.statusCode = code;
  }

  get reason() {
    return getReasonPhraseSafe(this.statusCode);
  }
}

export class BadRequestError extends HttpStatusError {
  constructor(options?: OsomErrorOptions) {
    super(StatusCodes.BAD_REQUEST, options);
  }
}

export class UnauthorizedError extends HttpStatusError {
  constructor(options?: OsomErrorOptions) {
    super(StatusCodes.UNAUTHORIZED, options);
  }
}
