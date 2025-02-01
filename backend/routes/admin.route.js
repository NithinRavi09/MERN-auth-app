import express from 'express';
import { adminLogin, getAllUsers, updateUser, deleteUser, adminLogout, createUser } from '../controllers/admin.controller.js';
import { adminAuth } from '../utils/verifyAdmin.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/users', adminAuth, getAllUsers);
router.post('/usersignup', adminAuth, createUser);
router.put('/edit/:id', adminAuth, updateUser);
router.delete('/delete/:id', adminAuth, deleteUser);
router.get('/logout', adminLogout)

export default router;
