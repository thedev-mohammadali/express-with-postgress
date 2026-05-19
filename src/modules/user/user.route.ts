import { Router } from "express";
import auth from "../../middleware/auth";
import { roles } from "../../types";
import { userController } from "./user.controller";

const router = Router();

const { getAllUsers, createUser, getUserById, deleteUserById, updateUserById } =
  userController;

router.post("/", createUser);
router.get("/", auth(roles.ADMIN, roles.AGENT), getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);
router.put("/:id", updateUserById);

export const userRoute: Router = router;
