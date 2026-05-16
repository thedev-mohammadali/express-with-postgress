import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router();

router.post("/", profileController.createProfile);
router.get("/:id", profileController.getProfileById);

export const profileRoute: Router = router;
