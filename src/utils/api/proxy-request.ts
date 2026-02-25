import { nextApiAxiosInstance } from './axios-instance';
import { NextRequest, NextResponse } from 'next/server';
import { AxiosError } from 'axios';

export async function proxyRequest(req: NextRequest, targetPath: string) {
  try {

    let body;
    if (req.method !== 'GET' && req.method !== 'DELETE') {
      try {
        body = await req.json();
      } catch (e) {
        body = null;
      }
    }

    const cookieHeader = req.headers.get('cookie') || '';

    const response = await nextApiAxiosInstance.request({
      method: req.method,
      url: targetPath,
      data: body,
      headers: {
        'Cookie': cookieHeader,
        'Content-Type': 'application/json',
      },
      params: Object.fromEntries(req.nextUrl.searchParams),
    });

    return NextResponse.json(response.data, { status: response.status });

  } catch (error: any) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status || 500;
    const data = axiosError.response?.data || { error: 'Internal Server Error' };

    return NextResponse.json(data, { status });
  }
}