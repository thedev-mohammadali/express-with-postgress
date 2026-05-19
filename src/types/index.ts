export const roles = {
  ADMIN: "admin",
  USER: "user",
  AGENT: "agent",
} as const;

const expiry = {
  "1m": "1m",
  "3m": "3m",
  "1d": "1d",
  "10d": "10d",
  "30d": "30d",
} as const;

export type Role = (typeof roles)[keyof typeof roles];
export type Expiry = (typeof expiry)[keyof typeof expiry];
