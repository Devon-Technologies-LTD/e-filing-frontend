import { ROLES } from "./lib/_definitions"

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
*/
export const publicRoutes = [
  '/',
  '/menus',
  '/categories',
]

/**
 * An array of routes used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
*/
export const authRoutes = [
  '/login',
  '/login/admin',
  '/signup',
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purpose
 * @type {string}
*/
export const apiAuthPrefix = '/api/auth'

/**
 * The prefix for API routes
 * Routes that start with this prefix are used for API purpose only
 * @type {string}
*/
export const apiPrefix = '/api'

/**
 * The default redirect path after logging in
 * @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT = '/dashboard/menus'
export const defaultLoginRedirect = (role?: ROLES) => {
  switch (role) {
    case 'SUPER_ADMIN':
    case 'GENERAL_MANAGER':
      return '/dashboard/menus'
    case 'FLOOR_ADMIN':
      return '/dashboard/tables'
    case 'CHEF':
    case 'WAITER':
    case 'STAFF':
      return '/dashboard/menus'
    default:
      return '/dashboard/settings'
  }
}

