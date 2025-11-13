import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check if user is logged in (check for auth token/cookie)
    const token = request.cookies.get('auth-token')?.value

    const isLoginPage = request.nextUrl.pathname === '/login'
    const isRootPage = request.nextUrl.pathname === '/'

    // If on root page
    if (isRootPage) {
        if (token) {
            // Logged in → redirect to dashboard
            return NextResponse.redirect(new URL('/dashboard', request.url))
        } else {
            // Not logged in → redirect to login
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // If trying to access protected routes without auth
    if (!token && !isLoginPage) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // If logged in and trying to access login page
    if (token && isLoginPage) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/dashboard/:path*', '/login']
}