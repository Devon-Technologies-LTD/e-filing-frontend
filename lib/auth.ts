import { SignJWT, jwtVerify } from 'jose'
import { TSessionData, TFullUser } from '@/lib/_definitions'
import { ALGORITHM, SECRET } from '@/lib/_constants'
import { cookies } from 'next/headers'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { decodeToken } from './utils'

const key = new TextEncoder().encode(SECRET)

type TCookieHelper = {
  name: string;
  options: Partial<ResponseCookie>;
  duration: number;
}
const cookieHelper: TCookieHelper = {
  name: 'session',
  options: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  },
  duration: 24 * 60 * 60 * 1000,
}

const auth = {
  user: <TFullUser | null>null,
  tokens: null,
  sessionCookie: null,

  encrypt: async (payload: any) => {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: ALGORITHM })
      .sign(key)
  },

  decrypt: async (session: any) => {
    try {
      const { payload } = await jwtVerify(session, key, {
        algorithms: [ALGORITHM],
      })
      return payload
    } catch (error) {
      console.error("Decryption error:", error);
      return null
    }
  },

  verifySession: async () => {
    const cookie = cookies().get(cookieHelper.name)?.value
    const session = await auth.decrypt(cookie)
    // if (!session?.id) {
    //   redirect('/login')
    // }
    return session as TSessionData | null
  },

  createSession: async (userData: TSessionData) => {
    const decryptedToken = decodeToken(userData.token)
    const expires = decryptedToken.exp
      ? decryptedToken.exp * 1000
      : new Date(Date.now() + cookieHelper.duration)
    const session = await auth.encrypt({ ...userData, expires })
    cookies().set(cookieHelper.name, session, { ...cookieHelper.options, expires })
  },

  deleteSession: () => {
    cookies().delete(cookieHelper.name)
    // redirect('/login') // would prefer this but server action will return an error instead
  },

  getUser: async () => {
    const session = await auth.verifySession()
    return session?.user?.id
  },

  getToken: async () => {
    const session = await auth.verifySession()
    return session?.token
  },
}

export default auth

