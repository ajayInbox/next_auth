/**
 * These are public routes
 * @type {string[]}
 */
export const publicRoutes: string[] = [
    "/"
]

/**
 * These are protected routes
 * @type {string[]}
 */
export const protectedRoutes: string[] = [
    "/auth/login",
    "/auth/register",
]

/**
 * This is prefix for Authentication Api
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth"

/**
 * The default redirect path after logged in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings"