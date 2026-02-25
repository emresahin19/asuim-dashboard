import { ApiHandler } from '@/types';
import { proxyRequest, apiHandler } from '@/utils';
import { NextRequest } from 'next/server';
    
const handler: ApiHandler = async (req: NextRequest, { params }: { params: { path: string[] } }) => {
  const endpoint = params.path.join('/');
  return proxyRequest(req, `/${endpoint}`);
};

export const GET = apiHandler(handler);
export const POST = apiHandler(handler);
export const PUT = apiHandler(handler);
export const PATCH = apiHandler(handler);
export const DELETE = apiHandler(handler);