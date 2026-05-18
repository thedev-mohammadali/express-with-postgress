import type { IjwtDecoded } from "../modules/auth/auth.interface";

declare global {
  namespace Express {
    interface Request {
      user?: IjwtDecoded;
    }
  }
}
