import { NextRequest, NextResponse } from 'next/server';

export enum STATUS_CODE {
    SUCCESS = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    METHOD_NOT_ALLOWED = 405,
};

export enum STATUS_MESSAGE {
    SUCCESS = 'Success',
    CREATED = 'Created',
    ACCEPTED = 'Accepted',
    NO_CONTENT = 'No Content',
    BAD_REQUEST = 'Bad Request',
    UNAUTHORIZED = 'Unauthorized',
    FORBIDDEN = 'Forbidden',
    NOT_FOUND = 'Not Found',
    CONFLICT = 'Conflict',
    INTERNAL_SERVER_ERROR = 'Internal Server Error',
    NOT_IMPLEMENTED = 'Not Implemented',
    BAD_GATEWAY = 'Bad Gateway',
    SERVICE_UNAVAILABLE = 'Service Unavailable',
    GATEWAY_TIMEOUT = 'Gateway Timeout',
    METHOD_NOT_ALLOWED = 'Method Not Allowed',
};

export enum STATUS_TYPE {
    SUCCESS = 'success',
    ERROR = 'error',
};

export enum REQUEST_METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
};

export type ApiHandler = (req: NextRequest, params?: any) => Promise<NextResponse>;

export interface ApiResponse<T> {
    statusCode: STATUS_CODE;
    data?: T;
    message?: string;
}

export interface PaginationResponse<T> {
    items: T[];
    total: number;
    page: number;
    options?: Record<string, any>;
    lastPage: number;
}