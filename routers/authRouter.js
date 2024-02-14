import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import { validateLogin, validateRegister } from "../middlewares/validationMiddleware.js";
import rateLimiter from "express-rate-limit";
const router = Router();

const apiLimiter = rateLimiter({
    windowMs: 1000*60*5,
    max: 15,
    message: {msg: 'IP rate limit exceeded, retry in 5 minutes'}
})
router.post('/register',apiLimiter,validateRegister,register);
router.post('/login',apiLimiter,validateLogin,login);
//we are using get because we are getting a cookie as response for logging out
router.get('/logout',logout);

export default router