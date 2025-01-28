import { authConfig } from "@/lib/_api/auth-config"
import { TSignupFormPayload, TLoginFormPayload } from "@/lib/_definitions"

const AuthService = {
  async signupUser(payload: TSignupFormPayload) {
    return await authConfig.post('/auth/signup', payload)
  },
  async loginUser(payload: TLoginFormPayload) {
    return await authConfig.post('/auth/login', payload)
  },
  async logout(payload: { refresh: string }) {
    return await authConfig.post('/auth/blacklist', payload)
  },
}
export default AuthService
