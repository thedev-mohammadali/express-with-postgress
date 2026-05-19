const roles = {
  ADMIN: "admin",
  USER: "user",
} as const;

type Role = (typeof roles)[keyof typeof roles];

export interface IUser {
  name: string;
  email: string;
  password: string;
  age: number;
  is_active?: boolean;
  role?: Role;
}
