import Footer from "@/components/Footer";
import styles from "@/app/page.module.css";

export const metadata = {
    title: "NextJS Posts",
    description: "A simple NextJS Application",
};

export default function PostLayout({ children }) {
    return (
        <>
            <section className={styles.title}>
                <h2>Posts</h2>
                <hr />
            </section>
            {children}
            <Footer />
        </>
    );
}
