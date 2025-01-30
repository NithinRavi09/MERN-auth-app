import express from 'express';
import { adminLogin, getAllUsers, updateUser, deleteUser, adminLogout } from '../controllers/admin.controller.js';


const router = express.Router();

router.post('/login', adminLogin);
router.get('/users', getAllUsers);
// router.post('/users/create', adminAuth, createUser);
router.put('/edit/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.get('/logout', adminLogout)

export default router;
