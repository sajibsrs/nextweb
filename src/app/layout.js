import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from "./page.module.css";

export const dynamic = 'force-static';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NextJS Home",
  description: "A simple NextJS Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className={styles.page}>
          {children}
        </div>
      </body>
    </html>
  );
}
