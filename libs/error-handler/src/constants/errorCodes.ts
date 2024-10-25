import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

// TODO: Need to be removed or cleaned up
export const ErrorCodes = {
  AUTH: {
    INVALID_AUTH_TOKEN: 'INVALID_AUTH_TOKEN',
    INVALID_CREDENTIAL: 'INVALID_CREDENTIAL',
  },
  JUSPAY: {
    ORDER_ID_REQUIRED: 'JUSPAY_ORDER_ID_REQUIRED',
  },
  MOVIE: {
    NOT_FOUND: 'MOVIE_NOT_FOUND',
  },
  PAYMENT: {
    SIGNATURE_NOT_FOUND: 'SIGNATURE_NOT_FOUND',
  },
  PLAN: {
    CANNOT_MIGRATE: 'PLAN_CANNOT_MIGRATE',
    NOT_FOUND: 'PLAN_NOT_FOUNT',
  },
  REFUND: {
    INVALID_AGENT: 'INVALID_AGENT',
    INVALID_TRANSACTION_ID: 'INVALID_TRANSACTION_ID',
    MANDATE_ORDER_ID_REQUIRED: 'MANDATE_ORDER_ID_REQUIRED',
    REFUND_FAILED: 'REFUND_FAILED',
  },
  ROLE: {
    ROLE_NOT_FOUND: 'ROLE_NOT_FOUND',
  },
  SETTING: {
    INVALID_PAYMENT_OPTION: 'INVALID_PAYMENT_OPTION',
    INVALID_PG_UPDATE_REQUEST: 'INVALID_PG_UPDATE_REQUEST',
    NOT_FOUND: 'SETTING_NOT_FOUND',
    UPDATE_FAILED: 'SETTING_UPDATE_FAILED',
  },
  SHOW: {
    NOT_FOUND: 'SHOW_NOT_FOUND',
  },
  SUBSCRIPTION: {
    NOT_FOUND: 'USER_SUBSCRIPTION_NOT_FOUND',
  },
  USER: {
    USER_NOT_FOUND: 'USER_NOT_FOUND',
  },
};

export const Errors = {
  AUTH: {
    INVALID_AUTH_TOKEN: (description?: string) =>
      new ForbiddenException(ErrorCodes.AUTH.INVALID_AUTH_TOKEN, {
        description,
      }),
    INVALID_CREDENTIALS: (description?: string) =>
      new UnauthorizedException(ErrorCodes.AUTH.INVALID_CREDENTIAL, {
        description,
      }),
  },
  JUSPAY: {
    ORDER_ID_REQUIRED: (description?: string) =>
      new BadRequestException(ErrorCodes.JUSPAY.ORDER_ID_REQUIRED, {
        description,
      }),
  },
  MOVIE: {
    NOT_FOUND: (description?: string) =>
      new NotFoundException(ErrorCodes.MOVIE.NOT_FOUND, {
        description,
      }),
  },
  PAYMENT: {
    SIGNATURE_NOT_FOUND: (description?: string) =>
      new NotFoundException(ErrorCodes.PAYMENT.SIGNATURE_NOT_FOUND, {
        description,
      }),
  },
  PLAN: {
    CANNOT_MIGRATE: (description?: string) =>
      new BadRequestException(ErrorCodes.PLAN.CANNOT_MIGRATE, {
        description,
      }),
    NOT_FOUND: (description?: string) =>
      new NotFoundException(ErrorCodes.PLAN.NOT_FOUND, {
        description,
      }),
  },
  REFUND: {
    INVALID_AGENT: (description?: string) =>
      new BadRequestException(ErrorCodes.REFUND.INVALID_AGENT, {
        description,
      }),
    INVALID_TRANSACTION_ID: (description?: string) =>
      new BadRequestException(ErrorCodes.REFUND.INVALID_TRANSACTION_ID, {
        description,
      }),
    MANDATE_ORDER_ID_REQUIRED: (description?: string) =>
      new BadRequestException(ErrorCodes.REFUND.MANDATE_ORDER_ID_REQUIRED, {
        description,
      }),
    REFUND_FAILED: (failureMessage?: string) =>
      new BadRequestException({
        message: {
          failureMessage,
          refunded: false,
        },
      }),
  },
  ROLE: {
    ROLE_NOT_FOUND: (description?: string) =>
      new UnauthorizedException(ErrorCodes.ROLE.ROLE_NOT_FOUND, {
        description,
      }),
  },
  SETTING: {
    INVALID_PAYMENT_OPTION: (description?: string) =>
      new NotFoundException(ErrorCodes.SETTING.INVALID_PAYMENT_OPTION, {
        description,
      }),
    INVALID_PG_UPDATE_REQUEST: (description?: string) =>
      new NotFoundException(ErrorCodes.SETTING.INVALID_PG_UPDATE_REQUEST, {
        description,
      }),
    NOT_FOUND: (description?: string) =>
      new NotFoundException(ErrorCodes.SETTING.NOT_FOUND, {
        description,
      }),
    UPDATE_FAILED: (description?: string) =>
      new NotFoundException(ErrorCodes.SETTING.NOT_FOUND, {
        description,
      }),
  },
  SHOW: {
    MOVIE: {
      NOT_FOUND: (description?: string) =>
        new NotFoundException(ErrorCodes.MOVIE.NOT_FOUND, {
          description,
        }),
    },
    NOT_FOUND: (description?: string) =>
      new NotFoundException(ErrorCodes.SHOW.NOT_FOUND, {
        description,
      }),
  },
  SUBSCRIPTION: {
    NOT_FOUND: (description?: string) =>
      new NotFoundException(ErrorCodes.SUBSCRIPTION.NOT_FOUND, {
        description,
      }),
  },
  USER: {
    USER_NOT_FOUND: (description?: string) =>
      new NotFoundException(ErrorCodes.USER.USER_NOT_FOUND, {
        description,
      }),
  },
};
