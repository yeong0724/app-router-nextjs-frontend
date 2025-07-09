import Link from "next/link";
import { type LayoutProps } from "@/types";
import style from "@/app/layout.module.css";
import "@/app/globals.css";

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <footer>제작 @winterlood</footer>
        </div>
      </body>
    </html>
  );
}
