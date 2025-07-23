import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateAdminCredentials, signToken } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate credentials
        if (!validateAdminCredentials(email, password)) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = await signToken({ email, role: 'admin' });

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set('admin-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
} 
