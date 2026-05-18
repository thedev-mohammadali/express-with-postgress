import type { JwtPayload } from "jsonwebtoken";

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
  created_at: Date;
  updated_at: Date;
}

export interface IjwtDecoded extends JwtPayload {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
}
