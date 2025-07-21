import { authConfig, authTemp } from "@/lib/_api/auth-config";
import {
  TSignupFormPayload,
  TLoginFormPayload,
  TForogotPayload,
} from "@/lib/_definitions";

const AuthService = {
  async signupUser(payload: TSignupFormPayload) {
    return await authConfig.post("/auth/signup", payload);
  },
  async forgotPassword(payload: TForogotPayload) {
    return await authConfig.post("/auth/forgot-password", payload);
  },
  async loginUser(payload: TLoginFormPayload) {
    return await authConfig.post("/auth/login", payload);
  },
  async googleLoginUser(email: string) {
    return await authConfig.get(`/user/google-email-data/${email}`);
  },
  async logout(payload: { refresh: string }) {
    return await authConfig.post("/auth/blacklist", payload);
  },
  async verifyOtp(payload: { otp: string; email: string }) {
    return await authConfig.post("/auth/verify-otp", payload);
  },
  async resendOtp(payload: { email: string }) {
    return await authConfig.post("/auth/resend-otp", payload);
  },
  async acceptInvite(payload: { email: string, otp: string }) {
    return await authConfig.get(`/user/accept-invite/${payload.email}/${payload.otp}`);
  },

  async resetPassword(payload: {
    email: string;
    new_password: string;
    confirm_password: string;
  }) {
    return await authTemp.post("/auth/reset-password", payload);
  },

  async changePassword(payload: {
    old_password: string;
    new_password: string;
    email: string;
  }) {
    return await authConfig.post("/auth/change-password", payload);
  },

};
export default AuthService;
