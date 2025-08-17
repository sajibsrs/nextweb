import Footer from "@/components/Footer";
import styles from "@/app/page.module.css";

export const metadata = {
    title: "NextJS Blog",
    description: "A simple NextJS Application",
};

export default function BlogLayout({ children }) {
    return (
        <>
            <section className={styles.title}>
                <h2>Blog</h2>
                <hr />
            </section>
            {children}
            <Footer />
        </>
    );
}
