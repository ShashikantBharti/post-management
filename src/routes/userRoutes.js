import { Router } from 'express';
import {
  login,
  logout,
  profile,
  register,
  registerPage,
  update,
} from '../controllers/userController.js';
import { isLoggedIn } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/').get(registerPage);

router.route('/register').post(register);

router.route('/profile/update/:id').post(update);

router.route('/login').post(login);

router.route('/logout').get(logout);

router.route('/profile/:userId').get(isLoggedIn, profile);

export default router;
