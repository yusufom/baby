/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development-only';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@babyregistry.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'supersecurepassword';

// Token expiration time (24 hours)
const EXPIRATION_TIME = '24h';

// Create a JWT token
export async function signToken(payload: any) {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const alg = 'HS256';

    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime(EXPIRATION_TIME)
        .sign(secret);

    return jwt;
}

// Verify a JWT token
export async function verifyToken(token: string) {
    try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

// Validate admin credentials
export function validateAdminCredentials(email: string, password: string) {
    return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

// Get token from cookies
export async function getTokenFromCookies() {
    const cookieStore = await cookies();
    return cookieStore.get('admin-token')?.value;
}

// Verify if user is authenticated
export async function isAuthenticated() {
    const token = await getTokenFromCookies();

    if (!token) {
        return false;
    }

    const payload = await verifyToken(token);
    return !!payload;
} 
