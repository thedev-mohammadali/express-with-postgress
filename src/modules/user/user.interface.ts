export interface IUser {
  name: string;
  email: string;
  password: string;
  age: number;
  is_active?: boolean;
}

export interface IProfile {
  bio: string;
  address: string;
  phone: string;
  gender: string;
}
