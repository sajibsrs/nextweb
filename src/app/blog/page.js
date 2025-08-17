import Footer from "@/components/Footer";
import { connect } from "@/lib/db";
import Post from "@/models/Post";
import "@/models/User";
import Link from "next/link";
import styles from "../page.module.css";
import Pagination from "./Pagination";

export const dynamic = 'force-dynamic';

export default async function Blog({ searchParams }) {
    await connect();
    const { page } = await searchParams;
    const curr_page = parseInt(page || "1", 10);
    const limit = 10;
    const skip = (curr_page - 1) * limit;

    const posts = await Post.find().sort({ date: -1 }).skip(skip).limit(limit).populate('userId', 'firstname lastname').lean();
    const total = await Post.countDocuments();

    return (
        <>
            <main className={styles.main}>
                <h1>Blog</h1>
                <section>
                    {posts.map(post => (
                        <article key={post._id.toString()}>
                            <Link href={`/posts/${post.slug}`}><strong>{post.title}</strong></Link>
                            <br />
                            By {post.userId.firstname} {post.userId.lastname} on <small>{new Date(post.date).toLocaleDateString('en-GB')}</small>
                        </article>
                    ))}
                </section>
                <Pagination total={total} page={curr_page} limit={limit} />
            </main>
            <Footer />
        </>
    );
}
