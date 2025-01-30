// import jwt from 'jsonwebtoken';

// export const adminAuth = (req, res, next) => {
//     const token = req.cookies.token || req.header('Authorization');

//     if (!token) {
//         return res.status(401).json({ success: false, message: 'Access Denied. No token provided.' });
//     }

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         if (verified.role !== 'admin') {
//             return res.status(403).json({ success: false, message: 'Not authorized as admin' });
//         }

//         req.admin = verified;
//         next();
//     } catch (error) {
//         res.status(400).json({ success: false, message: 'Invalid token' });
//     }
// };
