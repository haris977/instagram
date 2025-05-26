import { getfollower, UserDetail } from '../controllers/Profile.js';
import express from 'express';
const router = express.Router();
router.post('/profile/:id',UserDetail);
router.post('profile/follower/:id',getfollower);

export default router;