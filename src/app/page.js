import { SignupForm } from "@/ui/signup-form";
import styles from "./page.module.css";
import Footer from "@/ui/footer";

export default function Home() {
  return (
    <>
      <section className={styles.title}>
        <h2>Home</h2>
        <hr />
      </section>
      <main className={styles.main}>
        <SignupForm />
      </main>
      <Footer />
    </>
  );
}
