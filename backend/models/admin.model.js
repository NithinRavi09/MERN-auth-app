import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Admin', AdminSchema);
