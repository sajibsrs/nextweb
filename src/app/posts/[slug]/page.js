import styles from "@/app/page.module.css";
import { connect } from "@/lib/db";
import Comment from "@/models/comment";
import Post from "@/models/post";
import "@/models/user";

export const dynamic = 'force-dynamic';

export default async function PostPage({ params }) {
    await connect();

    const { slug } = await params;
    const post = await Post.findOne({ slug }).populate("userId", "firstname lastname").lean();
    const comments = await Comment.find({ postId: post._id }).sort({ date: -1 }).populate("userId", "firstname lastname").lean();
    const commentCount = await Comment.countDocuments({ postId: post._id });

    return (
        <>
            <main className={styles.main}>
                <h1>{post.title}</h1>
                <p><small>By <em>{post.userId.firstname} {post.userId.lastname}</em> on {new Date(post.date).toLocaleDateString('en-GB')}</small></p>
                <p>{post.content}</p>

                <section>
                    <p>💬 <strong>Comments ({commentCount})</strong></p>
                    {comments.map(comment => (
                        <div key={comment._id.toString()}>
                            <p>☠️ <em>{comment.userId.firstname} {comment.userId.lastname}</em> <br /> - {comment.content}</p>
                        </div>
                    ))}
                </section>
            </main>
        </>
    );
}
