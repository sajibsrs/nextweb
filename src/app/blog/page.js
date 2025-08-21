import { connect } from "@/lib/db";
import Post from "@/models/post";
import "@/models/user";
import Link from "next/link";
import styles from "../page.module.css";
import Pagination from "./pagination";

export const dynamic = 'force-dynamic';

export default async function Blog({ searchParams }) {
    await connect();

    const { page } = await searchParams;
    const currPage = parseInt(page || "1", 10);
    const limit = 10;
    const skip = (currPage - 1) * limit;

    const posts = await Post.find()
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .populate('userId', 'firstname lastname')
        .lean();

    const total = await Post.countDocuments();

    return (
        <main className={styles.main}>
            <section>
                {posts.map(post => (
                    <article key={post._id.toString()}>
                        <Link href={`/posts/${post.slug}`}><strong>{post.title}</strong></Link>
                        <br />
                        By <em>{post.userId.firstname} {post.userId.lastname}</em> on <small>{new Date(post.date).toLocaleDateString('en-GB')}</small>
                    </article>
                ))}
            </section>
            <Pagination total={total} page={currPage} limit={limit} />
        </main>
    );
}
