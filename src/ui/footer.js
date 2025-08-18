import Link from "next/link";
import styles from "@/app/page.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
        </footer>
    );
}
