import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

type SyncResult<T, E> = [T, undefined] | [undefined, E];
type AsyncResult<T, E> = Promise<[T, undefined] | [undefined, E]>;
type CombinedResult<T, E> = SyncResult<T, E> | AsyncResult<T, E>;
type NonUndefined<T> = T extends undefined ? never : T;

@Injectable()
export class ErrorHandlerService {
  async raiseErrorIfExistsAsync<T>(
    value: Promise<T>,
    exception: HttpException,
  ): Promise<void> {
    const resolvedValue = await value.catch((err) => {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    if (resolvedValue) {
      throw exception;
    }
  }

  raiseErrorIfFalse(value: boolean, exception: HttpException) {
    if (!value) {
      throw exception;
    }
    return value;
  }

  raiseErrorIfNull<T>(
    // This type check ensures that the value is not a Promise
    value: T extends Promise<T> ? never : T | undefined | null,
    exception: HttpException,
  ): T {
    if (!value) {
      throw exception;
    }
    return value;
  }
  async raiseErrorIfNullAsync<T>(
    value: Promise<T>,
    exception: HttpException,
  ): Promise<NonNullable<T>> {
    const resolvedValue = await value.catch((err) => {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
    if (!resolvedValue || resolvedValue === null) {
      throw exception;
    }
    return resolvedValue;
  }

  try<T, E>(fn: () => Promise<T>): AsyncResult<T, E>;
  try<T, E>(
    fn: () => Promise<T>,
    onThrow: (e: E) => void,
  ): Promise<[NonUndefined<T>, E]>;
  try<T, E>(fn: () => T): SyncResult<T, E>;
  try<T, E>(fn: () => T, onThrow: (e: E) => void): [NonUndefined<T>, E];
  try<T, E>(
    fn: (() => T) | (() => Promise<T>),
    onThrow?: (e: E) => void,
  ): CombinedResult<T, E> {
    const result = fn();
    if (result instanceof Promise) {
      return result
        .then((value) => [value, undefined] as [T, undefined])
        .catch(async (error) => {
          if (onThrow) {
            await onThrow(error as unknown as E);
          }
          return [undefined, error as E];
        });
    } else {
      try {
        return [result, undefined];
      } catch (error: unknown) {
        if (onThrow) {
          onThrow(error as unknown as E);
        }
        return [undefined, error as E];
      }
    }
  }
}
