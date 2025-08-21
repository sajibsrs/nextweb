import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    content: String,
    date: Date
});

export default mongoose.models.Comment || mongoose.model('Comment', commentSchema);
