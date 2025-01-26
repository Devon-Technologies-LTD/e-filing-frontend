import { z } from 'zod'



/* Signup schema */

export const SignupFormSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long.' })
    .trim(),
  last_name: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .trim(),
});

// .regex(/[^a-zA-Z0-9]/, {
//   message: 'Contain at least one special character.',
// })

export type TSignupFormPayload = z.infer<typeof SignupFormSchema>

/* Menu/dish update type */
export type TUpdateType = 'updateInput' | 'updateAddArray' | 'updateRemoveArray'

/* Login schema */

export const LoginFormSchema = z.object({
  email: z.string()
    .min(1, { message: 'Email field must not be empty.' }),
  password: z.string().min(1, { message: 'Password field must not be empty.' }),
});

export type TLoginFormPayload = z.infer<typeof LoginFormSchema>

export type FormState =
  | {
    errors?: {
      first_name?: string[];
      last_name?: string[];
      username?: string[];
      email?: string[];
      password?: string[];
    };
    message?: string;
  }
  | undefined;


/* User schema */

export type TFullUser = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  role: string;
  phone_number: string;
  gender: string;
  dob: string;
  passport?: string;
  passport_thumbnail?: string;
  staff_id: string;
  active: boolean;
  referee_name?: string;
  referee_number?: string;
  created_at: string;
  updated_at: string;
};

export type ROLES = "SUPER_ADMIN" | "GENERAL_MANAGER" | "FLOOR_ADMIN" | "STAFF" | "CHEF" | "WAITER" | "SECURITY"
export type GENDERS = "male" | "female" | "others"

export type TUser = {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  role: ROLES;
}

export type TSessionData = {
  user?: TUser;
  token: string;
  expires?: number;
}


/* Staff schema */

export const CreateStaffFormSchema = z.object({
  id: z.string().optional(),
  first_name: z.string()
    .min(3, { message: 'First name should not be less that 3 characters', })
    .trim(),
  last_name: z.string()
    .min(3, { message: 'Last name should not be less that 3 characters', })
    .trim(),
  middle_name: z.string()
    .min(3, { message: 'Middle name should not be less that 3 characters', })
    .trim().optional(),
  email: z.string().email({ message: 'Please enter a valid email address' }).trim(),
  phone_number: z.string()
    .min(11, { message: 'Phone number should not be less that 11 numbers' })
    .max(11, { message: 'Phone number cannot be more than 11 numbers' })
    .trim(),
  gender: z.enum(["male", "female", "others"]),
  active: z.boolean().default(false),
  date_of_birth: z.union([
    z.coerce.date()
      .min(new Date("1900-01-01"), { message: "The date is too old." })
      .max(new Date(), { message: "The date should be older than current data." }),
    z.string(),
  ]),
  role: z.enum(
    ["SUPER_ADMIN", "GENERAL_MANAGER", "FLOOR_ADMIN", "STAFF", "CHEF", "WAITER", "SECURITY"],
    { message: 'Role is required. Please select a role from the list.' }
  ),
  staff_id: z.string()
    .min(7, { message: 'Staff id should not be less than 7 characters' })
    .max(10, { message: 'Staff id should not be more than 10 characters' })
    .optional(),
  password: z.string().min(5, { message: 'Password should not be less than 5 characters' }).trim(),
  passport: z.string().optional(),
  next_of_kin: z.string().trim().optional(),
  referee_name: z.string().min(3, { message: 'Referee name should not be less than 3 characters' }).optional(),
  referee_number: z.string()
    .min(11, { message: 'Phone number should not be less that 11 numbers' })
    .max(11, { message: 'Phone number cannot be more than 11 numbers' })
    .trim().optional(),
  status: z.enum(['active', 'inactive']).optional(),
  action_by: z.string().trim().optional(), // The user creating this staff
})

export type TStaffCreate = z.infer<typeof CreateStaffFormSchema>


/* Delete object schema */

export const DeleteObjectFormSchema = z.object({
  id: z.string({ message: 'id must be provided' }),
})

export type TDeleteObjectFormPayload = z.infer<typeof DeleteObjectFormSchema>


/* Section schema */

export const CreateSectionFormSchema = z.object({
  name: z.string().min(2, { message: 'Name should not be less than 2 characters' }).trim(),
  id: z.string().uuid().optional(),
  active: z.boolean().optional(),
  price_percent: z.coerce.number({ message: 'Only numbers are allowed' }).optional(),
  description: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export type TSectionCreateFormPayload = z.infer<typeof CreateSectionFormSchema>


/* Meal category schema */

export const CreateMealCategoryFormSchema = z.object({
  name: z.string().min(2, { message: 'Name should not be less than 2 characters' }).trim(),
  id: z.string().uuid().optional(),
  description: z.string().optional(),
  active: z.boolean().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export type TMealCategoryCreateFormPayload = z.infer<typeof CreateMealCategoryFormSchema>


/* Menu schema */

const MAX_FILE_SIZE = 1024 * 1024 * 1 // 1MB
const SUPPORTED_FILE_TYPE = ['png', 'jpg', 'jpeg']

function checkFileType(file: File | undefined) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    return SUPPORTED_FILE_TYPE.some((el) => (el === fileType))
  }
  return false;
}

export const CreateMenuFormSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, { message: 'Name is required' }).trim(),
  description: z.string().optional(),
  // ingredients: z.union([
  //   z.string({ message: 'Ingredients are required' }).array(), z.string()],
  //   { message: 'Ingredients are required' }
  // ).optional(),
  price: z.union([
    z.string()
      .refine(
        // price should not have comma and should be number
        (price) => !price?.includes(',') && !isNaN(Number(price)), 'Price should be a number without commas.'
      ),
    z.number()]),
  // sections: z.string().uuid().array(),
  // categories: z.string().uuid().array(),
  sections: z.union(
    [z.string({ message: 'Sections are required' }).array(), z.string()],
    { message: "Sections are required" }
  ),
  categories: z.union(
    [z.string({ message: 'Categories are required' }).array(), z.string()],
    { message: "Categories are required" }
  ),
  tags: z.union(
    [z.string().array(), z.string()],
    { message: 'Tags are required' }
  ),
  status: z.boolean().default(false),
  image: z.instanceof(File)
    .refine(
      (file) => file && file.size > 0, 'Image is required.'
    )
    .refine(
      (file) => file && file?.size < MAX_FILE_SIZE, `Image size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB.`
    )
    .refine(
      (file) => checkFileType(file), `Only ${SUPPORTED_FILE_TYPE.join(', ')} formats are supported.`
    ),
  // notes: z.string().optional(),
})

export type TMenuCreateFormPayload = z.infer<typeof CreateMenuFormSchema>


/* Category and section schema */

export type TCategorySectionList = {
  id: string;
  name: string;
  active: boolean;
}

export type TCategoryAndSection = {
  id: string;
  name: string;
  active: boolean;
  price_percent?: number;
  description?: string;
  dishes?: number;
  created_at: string;
  updated_at: string;
}


/* Menu/Dish schema */

export type TMenu = {
  id: string,
  name: string,
  price: number,
  status: boolean,
  description: string,
  image: string,
  image_thumbnail: string,
  // ingredients: string[],
  tags: string[],
  sections: TCategoryAndSection[],
  categories: TCategoryAndSection[];
  created_at: string,
  updated_at: string
}


/* Sidebar nav items schema */

export type TSidebarNavItem = {
  id: number;
  name: string;
  href: string;
  icon: React.ReactNode;
  active: boolean;
  position: 'top' | 'middle' | 'bottom';
  submenu?: boolean;
  submenuItems?: TSidebarSubmenuItem[];
  disabled?: boolean;
  roles?: ROLES[];
}

export type TSidebarSubmenuItem = {
  id: number;
  name: string;
  href: string;
  active?: boolean;
}


/* Activator schema */

export const ActivatorSchema = z.object({
  activate: z.boolean(),
})

export type TActivatorPayload = z.infer<typeof ActivatorSchema>
