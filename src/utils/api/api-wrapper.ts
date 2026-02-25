import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from './error-handler';
import { ApiHandler } from '@/types';

export const apiHandler = (handler: ApiHandler) => {
  return async (req: NextRequest, context: any) => {
    try {
      return await handler(req, context);
    } catch (err: any) {
      const { statusCode, message, stack } = errorHandler(err);
      
      console.error({ url: req.url, statusCode, message, stack });

      return NextResponse.json(
        { error: message },
        { status: statusCode }
      );
    }
  };
};