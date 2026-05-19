export const roles = {
  ADMIN: "admin",
  USER: "user",
  AGENT: "agent",
} as const;

export type Role = (typeof roles)[keyof typeof roles];
