import { NextRequest, NextResponse } from "next/server";
import  { getUser, verifySession } from "@/lib/server/auth";

import {
  defaultLoginRedirect,
  apiAuthPrefix,
  apiPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes'

export async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl
  const isLoggedIn = !!(await getUser())
  const session = await verifySession()
  const user = session?.user
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  const isPublicRoute = publicRoutes.some(route => {
    if (route === '/login') {
      return nextUrl.pathname === '/login'; 
    }
    return nextUrl.pathname.startsWith(route); 
  });

  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  if (isApiRoute) {
    return NextResponse.next()
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(defaultLoginRedirect(user?.role), nextUrl))
      // return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return NextResponse.next()
  }

  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
