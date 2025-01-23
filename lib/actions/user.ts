'use server'

import UserService from "@/lib/_services/user-service";
import { ActivatorSchema, CreateStaffFormSchema, DeleteObjectFormSchema } from "@/lib/_definitions";
import auth from "@/lib/auth";
import { revalidatePath } from "next/cache";

type ErrorResponse = {
  response?: {
    status: number;
    data: {
      message: string;
      data:string; // Replace `any` with the actual type of `data` if available.
    };
  };
  request?: unknown;
  message?: string;
};

export async function createStaff(_prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);

  const result = CreateStaffFormSchema.safeParse(data);

  if (!result.success) {
    return { status: 400, errors: result.error.flatten().fieldErrors, message: 'Failed to create staff' };
  }

  try {
    await UserService.createUser(result.data);
    revalidatePath('/dashboard/staff');
    return { status: 201, errors: null, message: 'Staff created successfully' };
  } catch (err: unknown) {
    const error = err as ErrorResponse;

    if (error?.response) {
      return { status: error.response.status, message: error.response.data.message, errors: error.response.data.data };
    } else if (error?.request) {
      return {
        status: 504,
        message: 'Something went wrong. Please try again.',
        errors: 'Unable to process request.',
      };
    } else if (error?.message) {
      return { status: 500, message: error.message, errors: error.message };
    } else {
      return { status: 500, message: 'An unknown error occurred.', errors: 'Unknown error' };
    }
  }
}

export async function updateStaff(formData: FormData) {
  const data = Object.fromEntries(formData);
  const id = await auth.getUser() as string;

  const result = CreateStaffFormSchema.partial().safeParse(data);

  if (!result.success) {
    return { status: 400, errors: result.error.flatten().fieldErrors, message: 'Failed to update staff' };
  }

  try {
    await UserService.updateUser(result.data, id);
    return { status: 201, errors: null, message: 'Staff updated successfully' };
  } catch (err: unknown) {
    const error = err as ErrorResponse;

    if (error?.response) {
      return { status: error.response.status, message: error.response.data.message, errors: error.response.data.data };
    } else if (error?.request) {
      return {
        status: 504,
        message: 'Something went wrong. Please try again.',
        errors: 'Unable to process request.',
      };
    } else if (error?.message) {
      return { status: 500, message: error.message, errors: error.message };
    } else {
      return { status: 500, message: 'An unknown error occurred.', errors: 'Unknown error' };
    }
  }
}

export async function deleteStaff(formData: FormData) {
  const data = Object.fromEntries(formData);

  const result = DeleteObjectFormSchema.safeParse(data);

  if (!result.success) {
    return { status: 400, errors: result.error.flatten().fieldErrors, message: 'Failed to delete staff' };
  }

  try {
    await UserService.deleteUser(result.data);
    return { status: 201, errors: null, message: 'Staff deleted successfully' };
  } catch (err: unknown) {
    const error = err as ErrorResponse;

    if (error?.response) {
      return { status: error.response.status, message: error.response.data.message, errors: error.response.data.data };
    } else if (error?.request) {
      return {
        status: 504,
        message: 'Something went wrong. Please try again.',
        errors: 'Unable to process request.',
      };
    } else if (error?.message) {
      return { status: 500, message: error.message, errors: error.message };
    } else {
      return { status: 500, message: 'An unknown error occurred.', errors: 'Unknown error' };
    }
  }
}

export async function updateStaffStatus(id: string, formData: FormData) {
  const data = Object.fromEntries(formData);

  const result = ActivatorSchema.safeParse({ activate: data.activate === 'on' ? true : false });

  if (!result.success) {
    return { status: 400, errors: result.error.flatten().fieldErrors, message: 'Failed to update status.' };
  }

  try {
    await UserService.updateStaffStatus(id, result.data);
    revalidatePath('/', 'layout');
    return { status: 201, errors: null, message: 'Staff status updated successfully' };
  } catch (err: unknown) {
    const error = err as ErrorResponse;

    if (error?.response) {
      return { status: error.response.status, message: error.response.data.message, errors: error.response.data.data };
    } else if (error?.request) {
      return {
        status: 504,
        message: 'Something went wrong. Please try again.',
        errors: 'Unable to process request.',
      };
    } else if (error?.message) {
      return { status: 500, message: error.message, errors: error.message };
    } else {
      return { status: 500, message: 'An unknown error occurred.', errors: 'Unknown error' };
    }
  }
}

export async function uploadImage(_prevState: unknown, formData: FormData) {
  const id = formData.get('id') as string;

  try {
    await UserService.uploadImage(id, formData);
    revalidatePath('/dashboard/staff');
    return { status: 201, errors: null, message: 'Image was uploaded successfully' };
  } catch (err: unknown) {
    const error = err as ErrorResponse;

    if (error?.response) {
      return { status: error.response.status, message: error.response.data.message, errors: error.response.data.data };
    } else if (error?.request) {
      return {
        status: 504,
        message: 'Something went wrong. Please try again.',
        errors: 'Unable to process request.',
      };
    } else if (error?.message) {
      return { status: 500, message: error.message, errors: error.message };
    } else {
      return { status: 500, message: 'An unknown error occurred.', errors: 'Unknown error' };
    }
  }
}
