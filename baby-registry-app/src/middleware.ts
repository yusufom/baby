import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
    // Only apply to /admin routes (except /admin/login)
    const path = request.nextUrl.pathname;

    if (path.startsWith('/admin') && path !== '/admin/login') {
        const token = request.cookies.get('admin-token')?.value;

        if (!token) {
            // Redirect to login if no token found
            const url = new URL('/admin/login', request.url);
            return NextResponse.redirect(url);
        }

        try {
            // Verify the token
            const payload = await verifyToken(token);

            if (!payload || payload.role !== 'admin') {
                // Redirect to login if token is invalid
                const url = new URL('/admin/login', request.url);
                return NextResponse.redirect(url);
            }

            // Continue if token is valid
            return NextResponse.next();
        } catch (error) {
            console.error('Middleware error:', error);
            // Redirect to login if token verification fails
            const url = new URL('/admin/login', request.url);
            return NextResponse.redirect(url);
        }
    }

    // Continue for non-admin routes
    return NextResponse.next();
}

// Configure the paths that should be checked by the middleware
export const config = {
    matcher: ['/admin/:path*'],
}; 
