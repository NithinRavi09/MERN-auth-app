import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import path from 'path'

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Connected to MongoDB");
    
}).catch((error) => {
    console.log(error);
})

const __dirname = path.resolve();
const app = express();

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
// });

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; 
    const message = err.message || 'Internal Server Error'; 
    res.status(statusCode).json({ success: false, message }); 
});

app.listen(3000, ()=>{
    console.log('server listening on prot 3000');
});
