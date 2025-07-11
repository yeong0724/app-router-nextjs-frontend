import BookItem from "@/components/book-item";
import style from "@/app/(with-searchbar)/page.module.css";
import { type BookData } from "@/types";
import { delay } from "@/utils/delay";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

const DOMAIN = process.env.NEXT_PUBLIC_API_SERVER_URL;

/**
 * App Router 방식에서는 Server Component에 async 만 붙여주면 서버에서 API 통신이 가능하다
 * (해당 Home 컴포넌트는 서버에서만 실행되는 Server Component이기에 브러우저 log에 찍히지 않음)
 */
async function AllBooks() {
  await delay(1000);

  /**
   * 1. cache: "force-cache"
   *  - 데이터 패치 결과를 캐시처리 하도록 하는 옵션
   *
   * 2. cache: "no-store"
   *  - 데이터 페치 결과를 저장하지 않는 옵션
   *  - 캐싱 처리를 하지 않음 (cache skip)
   *
   * 3. next: { revalidate: 10 } <<- 10초 추기
   *  - 특정 시간을 주기로 캐시를 업데이트 하는 옵션
   *  - page router의 ISR 방식과 유사한 개념
   *
   * 4. next: { tags: ['a'] }
   *  - 요청이 들어왔을 때 데이터를 최신화 하는 방식
   *  - On-Demand Revalidate 방식과 유사한 옵션
   */
  const response = await fetch(`${DOMAIN}/book`, { cache: "no-store" });

  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }

  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecommendBooks() {
  await delay(1000);

  const response = await fetch(`${DOMAIN}/book/random`, {
    next: { revalidate: 3 },
  });

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

/**
 * [Route Segment 옵션]
 * - dynamic 값을 export 하여 특정 페이지의 유형을 강제로 설정할 수 있다.
 * - Next App은 자체적으로 Dynamic/Static을 구분하여 빌드해 주므로 권장되지 않는 옵션이다.
 * 1. auto: 기본값, 아무 설정값도 강제하지 않음
 * 2. force-dynamic: 강제로 페이지를 Dynamic Page로 설정
 * 3. force-static: 강제로 페이지를 Static Page로 설정
 * 4. error: 강제로 페이지를 Static Page로 설정하지만 Static이 되면 안되는 페이지라면 빌드 단계에서 에러를 발생시킴
 *   ex) /search/page.tsx
 */

export const dynamic = "force-dynamic";

/**
 * root 페이지는 현재 static 컴포넌트이기 때문에 스트리밍 기능을 제공하기 위해서는 강제로 dynamic 컴포넌트로 설정해줘야 한다.
 */
export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={2} />}>
          <RecommendBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
