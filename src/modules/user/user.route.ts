import { Router } from "express";
import auth from "../../middleware/auth";
import { userController } from "./user.controller";

const router = Router();

const { getAllUsers, createUser, getUserById, deleteUserById, updateUserById } =
  userController;

router.post("/", createUser);
router.get("/", auth(), getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);
router.put("/:id", updateUserById);

export const userRoute: Router = router;
