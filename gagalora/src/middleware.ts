import { cookies } from 'next/headers';
import errorHandler from './helpers/errorHandler';
import { verifyWithJose } from './helpers/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const cookiesStore = await cookies();

    const authorization = cookiesStore.get('Authorization');
    if (request.nextUrl.pathname.startsWith('/api/wishlists')) {
      if (!authorization) {
        throw { message: 'Please login first', status: 401 };
      }

      const [type, token] = authorization.value.split(' ');
      if (type !== 'Bearer') {
        throw { message: 'Invalid token', status: 401 };
      }

      const decoded = verifyWithJose<{ _id: string; email: string }>(token);

      const userId = (await decoded)._id;

      const response = NextResponse.next();
      response.headers.set('x-user-id', userId);

      return response;
    }

    if (request.nextUrl.pathname.startsWith('/wishlists')) {
      if (!authorization) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  } catch (error) {
    return errorHandler(error);
  }
}

export const config = {
  matcher: ['/api/wishlists/:path*', '/wishlists/:path*'],
};
