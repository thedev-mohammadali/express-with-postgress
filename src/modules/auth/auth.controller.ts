import type { Request, Response } from "express";
import type { ICredential } from "./auth.interface";
import { authService } from "./auth.service";

const userLogin = async (req: Request<{}, {}, ICredential>, res: Response) => {
  const data = req.body;

  try {
    const result = await authService.loginUserIntoDB(data);
    res.json({
      success: "true",
      message: "Log in successful",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: "false",
      message: error.message,
    });
  }
};

export const authController = {
  userLogin,
};
