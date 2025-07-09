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
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
