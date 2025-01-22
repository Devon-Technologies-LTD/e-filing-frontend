'use server'


import UserService from "@/lib/_services/user-service"
import { ActivatorSchema, CreateStaffFormSchema, DeleteObjectFormSchema } from "@/lib/_definitions"
import auth from "@/lib/auth"
import { revalidatePath } from "next/cache"


export async function createStaff(_prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData)

  const result = CreateStaffFormSchema.safeParse(data)

  if (!result.success) {
    return { status: 400, errors: result.error.flatten().fieldErrors, message: 'Failed to create staff' }
  }

  try {
    await UserService.createUser(result.data)
    revalidatePath('/dashboard/staff')
    return { status: 201, errors: null, message: 'Staff created successfully' }
  } catch (err: any) {
    if (err?.response) {
      return { status: err.response.status, message: err.response.data.message, errors: err.response.data.data }
    } else if (err.request) {
      return {
        status: 504,
        message: 'Something went wrong. Please try again.',
        errors: 'Unable to process request.',
      }
    } else {
      return { status: 500, message: err.message, errors: err.message }
    }
  }
}

export async function updateStaff(formData: FormData) {
  const data = Object.fromEntries(formData)
  const id = await auth.getUser() as string

  const result = CreateStaffFormSchema.partial().safeParse(data)

  if (!result.success) {
    return { status: 400, errors: result.error.flatten().fieldErrors, message: 'Failed to update staff' }
  }

  try {
    const res = await UserService.updateUser(result.data, id)
    return { status: 201, errors: null, message: 'Staff updated successfully' }
    // return res.data
  } catch (err: any) {
    if (err?.response) {
      return { status: err.response.status, message: err.response.data.message, errors: err.response.data.data }
    } else if (err.request) {
      return {
        status: 504,
        message: 'Something went wrong. Please try again.',
        errors: 'Unable to process request.',
      }
    } else {
      return { status: 500, message: err.message, errors: err.message }
    }
  }
}


export async function deleteStaff(formData: FormData) {
  const data = Object.fromEntries(formData)

  const result = DeleteObjectFormSchema.safeParse(data)

  if (!result.success) {
    return { status: 400, errors: result.error.flatten().fieldErrors, message: 'Failed to create staff' }
  }

  try {
    const res = await UserService.deleteUser(result.data)
    return { status: 201, errors: null, message: 'Staff created successfully' }
    // return res.data
  } catch (err: any) {
    if (err?.response) {
      return { status: err.response.status, message: err.response.data.message, errors: err.response.data.data }
    } else if (err.request) {
      return {
        status: 504,
        message: 'Something went wrong. Please try again.',
        errors: 'Unable to process request.',
      }
    } else {
      return { status: 500, message: err.message, errors: err.message }
    }
  }
}

export async function updateStaffStatus(id: string, formData: FormData) {
  const data = Object.fromEntries(formData)

  const result = ActivatorSchema.safeParse({ activate: data.activate === 'on' ? true : false })

  if (!result.success) {
    return { status: 400, errors: result.error.flatten().fieldErrors, message: 'Failed to update status.' }
  }

  try {
    await UserService.updateStaffStatus(id, result.data)
    revalidatePath('/', 'layout')
    return { status: 201, errors: null, message: 'Staff status updated successfully' }
  } catch (err: any) {
    if (err?.response) {
      return { status: err.response.status, message: err.response.data.message, errors: err.response.data.data }
    } else if (err.request) {
      return {
        status: 504,
        message: 'Something went wrong. Please try again.',
        errors: 'Unable to process request.',
      }
    } else {
      return { status: 500, message: err.message, errors: err.message }
    }
  }
}

export async function uploadImage(_prevState: unknown, formData: FormData) {
  let id = formData.get('id') as string

  try {
    await UserService.uploadImage(id, formData)
    revalidatePath('/dashboard/staff')
    return { status: 201, errors: null, message: 'Image was uploaded successfully' }
  } catch (err: any) {
    if (err?.response) {
      return { status: err.response.status, message: err.response.data.message, errors: err.response.data.data }
    } else if (err.request) {
      return {
        status: 504,
        message: 'Something went wrong. Please try again.',
        errors: 'Unable to process request.',
      }
    } else {
      return { status: 500, message: err.message, errors: err.message }
    }
  }
}
