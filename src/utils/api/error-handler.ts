import { STATUS_CODE, STATUS_MESSAGE } from "@/types";

export class CustomError extends Error {
    public statusCode: STATUS_CODE;
    public error: string;

    constructor(statusCode: STATUS_CODE, message: string, error?: string) {
        super(message);
        this.statusCode = statusCode;
        this.error = error || message;
    }
}

export const errorHandler = (err: any): CustomError => {
    if (err instanceof CustomError) {
        return err;
    }

    let statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR;
    let message = STATUS_MESSAGE.INTERNAL_SERVER_ERROR as string;

    if (err.isAxiosError) {
        const axiosError = err as any;
        statusCode = axiosError.response?.status || STATUS_CODE.INTERNAL_SERVER_ERROR;
        message = axiosError.response?.data?.error || axiosError.message || STATUS_MESSAGE.INTERNAL_SERVER_ERROR;
    } else if (err instanceof Error) {
        message = err.message;
    }

    return new CustomError(statusCode, message);
};
