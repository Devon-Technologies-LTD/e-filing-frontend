
export type ROLES = "USER" | "LAWYER" | "ADMIN" | "ASSIGNING_MAGISTRATES" | "PRESIDING_MAGISTRATES";

export interface User {
  id: string;
  role: ROLES;
  name: string;
}
