import express from 'express';
const router = express.Router();
import {singup,login, changePassword} from '../controllers/Varify.js'
router.post('/signup',singup);
router.post('/login',login);
router.post('/changepassword',changePassword);

export default router;