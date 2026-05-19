import type { Request, Response } from "express";
import type { ICredential } from "./auth.interface";
import { authService } from "./auth.service";

const userLogin = async (req: Request<{}, {}, ICredential>, res: Response) => {
  const data = req.body;

  try {
    const result = await authService.loginUserIntoDB(data);
    const { refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    });

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

const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken as string;
  try {
    const result = await authService.generateFreshToken(refreshToken);

    res.json({
      success: "true",
      message: "Access token generated successful",
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
  refreshToken,
};
