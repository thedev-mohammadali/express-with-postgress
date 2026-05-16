import type { Request, Response } from "express";
import type { IProfile } from "./profile.interface";
import { profileService } from "./profile.service";

const createProfile = async (req: Request<{}, {}, IProfile>, res: Response) => {
  const data = req.body;

  try {
    const result = await profileService.createProfileIntoDB(data);
    res.json({
      success: "true",
      message: "User Profile created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    const errMsg =
      error.code === "23505" ? "User profile already exists!" : error.message;
    const status = error instanceof Error ? 404 : 400;
    res.status(status).json({
      success: "false",
      message: errMsg,
    });
  }
};

const getProfileById = async (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  const result = await profileService.getProfileByIdFromDB(id);

  if (result.rowCount === 0) {
    res.status(404).json({
      success: false,
      message: `Profile of the user with id: ${id} not found`,
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Profile retrieved successfully",
    data: result.rows[0],
  });
};

export const profileController = {
  createProfile,
  getProfileById,
};
