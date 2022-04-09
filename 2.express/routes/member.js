import express from 'express';
import handlerFactory from '../middleware/handlerFactory.middleware.js';
import MemberController from '../controllers/Member.js';

const router = express.Router();

router.get('/register', handlerFactory(MemberController.createMember));
router.post('/register', handlerFactory(MemberController.createMember));
router.get('/login', handlerFactory(MemberController.userLogin));
router.post('/login', handlerFactory(MemberController.userLogin));
router.get('/logout', handlerFactory(MemberController.userLogout));
router.get('/info', handlerFactory(MemberController.updateMember));
router.post('/info/:mb_no', handlerFactory(MemberController.updateMember));
router.get('/delete', handlerFactory(MemberController.updateMember));

export default router;