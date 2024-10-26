import { Router } from 'express';
import { createNewPost } from '../controllers/postController.js';

const router = Router();

router.route('/').post(createNewPost);

export default router;
