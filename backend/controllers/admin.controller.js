import Admin from '../models/Admin.model.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Admin Login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ success: false, message: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const {...rest} = admin._doc;
        const expiryDate = new Date(Date.now() + 3600000);

        res.cookie('adminToken', token, { httpOnly: true, expires: expiryDate }).status(200).json({ success: true, admin: rest });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const search = req.query.search || "";
        const users = await User.find({ username: { $regex: search, $options: "i" } });

        res.json(users);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Create User
export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        res.json({ success: true, message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


// Edit User
export const updateUser = async (req, res) => {
    try {
        const { username, email } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }
        
        await User.findByIdAndUpdate(req.params.id, { username, email });

        res.json({ success: true, message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// admin logout
export const adminLogout = (req, res) => {
    try {
        res.clearCookie('adminToken', { httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(200).json({ success: true, message: 'Admin logged out successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

