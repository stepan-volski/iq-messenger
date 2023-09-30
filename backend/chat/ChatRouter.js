import Router from 'express';
import ChatController from './ChatController.js';

const router = new Router();

router.get('/', ChatController.getAll);
router.post('/', ChatController.create);
router.get('/:id', ChatController.getOne);
router.delete('/:id', ChatController.delete);
router.put('/', ChatController.update);

export default router;