import {Router} from "express"
import { auth, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser)
router.route('/auth').get(auth)


export default router