import { Suspense } from "react";
import Searchbar from "@/components/searchbar";
import Loading from "@/components/loading";
import { type LayoutProps } from "@/types";

/**
 * [Suspense]
 * Searchbar 컴포넌트는 queryString 값을 읽기 위해서 useSearchParams Hook을 호출하고 있다.
 * 문제는 Layout 컴포넌트 서버 컴포넌트로써 Build 시에 사전 렌더링이 진행되는데 서버측에서는 useSearchParams을 실행 할 수 없어서 에러가 발생한다.
 * 때문에 Suspense 컴포넌트로 Searchbar 컴포넌트를 감싸게되면 오직 클라이언트 측에서만 렌더링이 되는 컴포넌트로 설정이 된다.
 */
export default function Layout({ children }: LayoutProps) {
  /**
   * [Client Router Cache 개념]
   * - Next App은 페이지 이동간에 중복해서 서버로부터 받을 페이지는 브라우저에 캐시로 저장하여 반복적으로 페이지 데이터를 받아오는 걸 방지한다.
   * - 단, cache로 저장되는 페이지는 layout에 국한되며 새로고침을 하게 되면 클라이언트 라우터 캐시는 삭제된다.
   * ex) 실제로 인덱스 페이지에서 Searchbar를 통해 /search 페이지로 이동을해도 시간이 바뀌지 않는다. 왜냐하면 캐시처리된 Layout 이기 때문이다.
   */
  return (
    <div>
      {/* <div>{new Date().toLocaleString()}</div> */}
      <Suspense fallback={<Loading />}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
