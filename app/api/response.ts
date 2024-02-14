import 'server-only';

import {StatusCodes} from 'http-status-codes';
import {NextResponse} from 'next/server';
import type {EmptyResponse} from '@/app/api/interface';

export function redirect(url: string | URL) {
  return NextResponse.redirect(url);
}

export function ok<T = EmptyResponse>(body?: T) {
  return NextResponse.json<T>(body ?? ({} as T));
}

export function badRequest<T = EmptyResponse>(body?: T) {
  return NextResponse.json<T>(body ?? ({} as T), {
    status: StatusCodes.BAD_REQUEST,
  });
}

export function unauthorized<T = EmptyResponse>(body?: T) {
  return NextResponse.json<T>(body ?? ({} as T), {
    status: StatusCodes.UNAUTHORIZED,
  });
}

export function internalServerError<T = EmptyResponse>(body?: T) {
  return NextResponse.json<T>(body ?? ({} as T), {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  });
}
