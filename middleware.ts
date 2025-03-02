import { NextRequest, NextResponse } from "next/server";
import { getUser, verifySession } from "@/lib/server/auth";

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
  if (isApiAuthRoute) {
    return NextResponse.next()
  }

   // Exclude '/' from allowing subpaths
   const isPublicRoute = publicRoutes.some(route => {
    if (route === '/') {
      return nextUrl.pathname === '/'; // Exact match only for '/'
    }
    return nextUrl.pathname.startsWith(route); // Allow subpaths for all other routes
  });
  
  if (isApiRoute) {
    return NextResponse.next()
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(defaultLoginRedirect(user?.role), nextUrl))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
