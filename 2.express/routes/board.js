import express from 'express';
import handlerFactory from '../middleware/handlerFactory.middleware.js';
import { auth } from '../middleware/auth.middleware.js';
import BoardController from '../controllers/Board.js';

const router = express.Router();

router.get('/', auth(), handlerFactory(BoardController.getAllPost));
router.get('/detail/:bo_no', handlerFactory(BoardController.getPostById));
router.get('/write', handlerFactory(BoardController.writePost));
router.post('/write', handlerFactory(BoardController.writePost));
router.get('/update/:bo_no', handlerFactory(BoardController.updatePost));
router.post('/update/:bo_no', handlerFactory(BoardController.updatePost));
router.get('/delete/:bo_no', handlerFactory(BoardController.deletePost));

export default router;