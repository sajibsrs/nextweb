import Link from "next/link";
import styles from "@/app/page.module.css";

export default function Pagination({ total, page, limit }) {
    const totalPage = Math.ceil(total / limit);

    return (
        <nav className={styles.pagination}>
            {Array.from({ length: totalPage }, (_, i) => i + 1).map(num => (
                <Link key={num} href={`/blog?page=${num}`}>
                    <button disabled={num === page}>{num}</button>
                </Link>
            ))}
        </nav>
    );
}
