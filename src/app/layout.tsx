import Link from "next/link";
import { type BookData, type LayoutProps } from "@/types";
import style from "@/app/layout.module.css";
import "@/app/globals.css";

/**
 * [Request Memoization]
 * - Root Page가 현재 렌더링 될때 젠체 book을 조회하는 api는 메인 페이지에서 한번, Footer 컴포넌트에서 한번 총 2번 호출하게 된다.
 * - App Route 방식은 데이터가 필요한 곳에서 각자 직접 Fetching을 하기 때문에 이런식으로 필연적이게 동일한 API를 호출하는 상황에 직면할 수 밖에 없다.
 *   때문에 Nextjs는 페이지가 렌더링 되는 단계에서 동일한 API 호출되면 하나의 API만 서버에 요청이 되고 나머지는 캐싱된 데이터가 응답이 된다.
 *
 * - 일반적인 데이터 캐시와는 다르게 페이지가 완전히 렌더링 되고 나서는 해당 캐시는 완전히 지워지게 되어 다시 재차 페이지가 로드가 될때
 *   새로운 데이터 응답값을 받게 된다.
 */
async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
  );

  if (!response.ok) {
    return <footer>제작 @winterlood</footer>;
  }

  const books: BookData[] = await response.json();
  const bookCount = books.length;

  return (
    <footer>
      <div>제작 @winterlood</div>
      <div>{bookCount}개의 도서가 등록되어 있습니다</div>
    </footer>
  );
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
