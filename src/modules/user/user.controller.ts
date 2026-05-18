import type { Request, Response } from "express";
import type { IUser } from "./user.interface";
import { userService } from "./user.service";

const { getAllUsersFromDB, createUserIntoDB } = userService;

const getAllUsers = async (req: Request, res: Response) => {
  const result = await getAllUsersFromDB();

  res.status(200).json({
    success: "true",
    message: "Users retrieved successfully",
    data: result.rows,
  });
};

const createUser = async (req: Request<{}, {}, IUser>, res: Response) => {
  const data = req.body;

  try {
    await createUserIntoDB(data);
    res.json({
      success: "true",
      message: "User created successfully",
    });
  } catch (error: any) {
    const errMsg =
      error.code === "23505" ? "Email already exists!" : error.message;
    res.status(400).json({
      success: "false",
      message: errMsg,
    });
  }
};

const getUserById = async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  try {
    const result = await userService.getUserByIdFromDB(id);

    if (result.rowCount === 0) {
      res.status(400).json({
        success: "false",
        message: `User not found with id = ${id}`,
      });
      return;
    }
    res.status(200).json({
      success: "true",
      message: "User retreived successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: "false",
      message: error.message,
      error,
    });
  }
};

const deleteUserById = async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  try {
    const result = await userService.deleteUserByIdFromDB(id);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: "false",
        message: `User not found with id = ${id}`,
      });
      return;
    }
    res.status(200).json({
      success: "true",
      message: "User deleted successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: "false",
      message: error.message,
      error,
    });
  }
};

const updateUserById = async (
  req: Request<{ id: string }, {}, Partial<Omit<IUser, "email">>>,
  res: Response,
) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    const result = await userService.updateUserByIdIntoDB(id, payload);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: "false",
        message: `User not found with id = ${id}`,
      });
      return;
    }
    res.status(200).json({
      success: "true",
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: "false",
      message: error.message,
      error,
    });
  }
};

export const userController = {
  getAllUsers,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
};
