import { Router } from "express";
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userController.js";
import { validateUpdateUser } from "../middlewares/validationMiddleware.js";
import { authorizePermissions } from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/current-user',getCurrentUser);
router.get('/admin/app-stats',authorizePermissions('admin'),getApplicationStats);
//we are using get because we are getting a cookie as response for logging out
router.patch('/update-user',validateUpdateUser,updateUser);

export default router