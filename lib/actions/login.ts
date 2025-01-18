// 'use server'

// import { LoginFormSchema, ROLES } from "@/lib/_definitions"
// import authService from "@/lib/_services/auth-service"
// import auth from "@/lib/auth"
// import { DEFAULT_LOGIN_REDIRECT, defaultLoginRedirect } from "@/routes"
// import { redirect } from "next/navigation"

// export async function loginAction(_prevState: unknown, formData: FormData) {
//   const data = Object.fromEntries(formData)

//   const result = LoginFormSchema.safeParse(data)

//   if (!result.success) {
//     return { status: 400, errors: result.error.flatten().fieldErrors, message: 'Login failed' }
//   }

//   let role: ROLES;

//   try {
//     const res = await authService.loginUser(result.data)
//     const sessionData = {
//       user: {
//         staff_id: res.data.staff,
//         id: res.data.ID,
//         email: res.data.email,
//         first_name: res.data.first_name,
//         last_name: res.data.last_name,
//         role: res.data.role,
//       },
//       token: res.data.token,
//     }
//     role = sessionData.user.role
//     await auth.createSession(sessionData)
//   } catch (err: any) {
//     if (err?.response) {
//       return { status: err.response.status, message: err.response.data.message, errors: err.response.data.data }
//     } else if (err.request) {
//       return { status: 504, message: 'Something went wrong. Please try again.', errors: 'Unable to process request.' }
//     } else {
//       return { status: 500, message: err.message, errors: err.message }
//     }
//   }

//   redirect(defaultLoginRedirect(role))
//   // redirect(DEFAULT_LOGIN_REDIRECT)
// }

// export async function adminLoginAction(_prevState: unknown, formData: FormData) {
//   const data = Object.fromEntries(formData)

//   const result = LoginFormSchema.safeParse(data)

//   if (!result.success) {
//     return { status: 400, errors: result.error.flatten().fieldErrors, message: 'Login failed' }
//   }

//   try {
//     const res = await authService.loginUser(result.data)
//     const sessionData = {
//       user: {
//         staff_id: res.data.staff,
//         id: res.data.id,
//         email: res.data.email,
//         first_name: res.data.firstname,
//         last_name: res.data.lastname,
//         role: res.data.role,
//       },
//       token: res.data.token,
//     }
//     await auth.createSession(sessionData)
//   } catch (err: any) {
//     if (err?.response) {
//       return { status: err.response.status, message: err.response.data.message, errors: err.response.data.data }
//     } else if (err.request) {
//       return { status: 504, message: 'Something went wrong. Please try again.', errors: 'Unable to process request.' }
//     } else {
//       return { status: 500, message: err.message, errors: err.message }
//     }
//   }

//   redirect(DEFAULT_LOGIN_REDIRECT)
// }

// export async function logoutAction(_formData: FormData) {
//   auth.deleteSession()
//   auth.user = null
//   redirect('/login')
// }
