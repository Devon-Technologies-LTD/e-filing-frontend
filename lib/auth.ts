import { SignJWT, jwtVerify } from 'jose';
import { TSessionData, TFullUser } from '@/lib/_definitions';
import { ALGORITHM, SECRET } from '@/lib/_constants';
import { cookies } from 'next/headers';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { decodeToken } from './utils';

const key = new TextEncoder().encode(SECRET);

type TCookieHelper = {
  name: string;
  options: Partial<ResponseCookie>;
  duration: number;
};

const cookieHelper: TCookieHelper = {
  name: 'session',
  options: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  },
  duration: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
};

const auth = {
  user: <TFullUser | null>null,
  tokens: null as string | null,
  sessionCookie: null as string | null,

  encrypt: async (payload: Record<string, unknown>) => {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: ALGORITHM })
      .sign(key);
  },

  decrypt: async (session: string) => {
    try {
      const { payload } = await jwtVerify(session, key, {
        algorithms: [ALGORITHM],
      });
      return payload as Record<string, unknown>; // Use a stricter type if possible
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  verifySession: async () => {
    const cookie = cookies().get(cookieHelper.name)?.value;
    if (!cookie) return null;

    const session = await auth.decrypt(cookie);
    return session as TSessionData | null;
  },

  createSession: async (userData: TSessionData) => {
    const decryptedToken = decodeToken(userData.token);

    const expires = decryptedToken.exp
      ? new Date(decryptedToken.exp * 1000) // Convert to milliseconds
      : new Date(Date.now() + cookieHelper.duration);

    const session = await auth.encrypt({ ...userData, expires });
    cookies().set(cookieHelper.name, session, {
      ...cookieHelper.options,
      expires,
    });
  },

  deleteSession: () => {
    cookies().delete(cookieHelper.name);
    // redirect('/login'); // Commented out because server action would cause an error
  },

  getUser: async () => {
    const session = await auth.verifySession();
    return session?.user?.id || null;
  },

  getToken: async () => {
    const session = await auth.verifySession();
    return session?.token || null;
  },
};

export default auth;
