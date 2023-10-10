import Router from 'express';
import UserController from './UserController.js';

const router = new Router();

// router.get('/', UserController.getAll);
router.post('/register', UserController.create);
router.post('/authenticate', UserController.getByUser);

export default router;