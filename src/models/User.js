import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstname: String,
    lastname: String,
    email: { type: String, required: true, unique: true },
    password: String,
    date: Date
});

export default mongoose.models.User || mongoose.model('User', userSchema);
