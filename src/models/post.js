import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    slug: String,
    content: String,
    date: Date
});

export default mongoose.models.Post || mongoose.model('Post', postSchema);
