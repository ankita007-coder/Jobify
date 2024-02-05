import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import { validateLogin, validateRegister } from "../middlewares/validationMiddleware.js";

const router = Router();

router.post('/register',validateRegister,register);
router.post('/login',validateLogin,login);
//we are using get because we are getting a cookie as response for logging out
router.get('/logout',logout);

export default router