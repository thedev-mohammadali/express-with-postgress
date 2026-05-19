import type { JwtPayload } from "jsonwebtoken";
import type { Role } from "../../types";

export interface ICredential {
  email: string;
  password: string;
}

export interface IUserDataResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  is_active: boolean;
  age: number;
  role: Role;
  created_at: Date;
  updated_at: Date;
}

export interface IjwtDecoded extends JwtPayload {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  role?: Role;
}
