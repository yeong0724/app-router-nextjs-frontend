/**
 * [Error Component]
 * - 해당 Error 컴포넌트 경로하에 있는 페이지 컴포넌트들은 이제 에러가 발생할시에 페이지 컴포넌트 대신에 에러 컴포넌트가 대신 렌더링 된다.
 * - use client 지시자를 선언해줘야 하는 이유는 에러가 발생하는 환경이 서버측에서 발생할지 클라이언트 측에서 발생할지 알 수 없기 때문이다.
 * - 만약 하위 경로에 Error 컴포넌트를 추가로 생성하면 하위 에러 컴포넌트가 덮어져서 렌더링 된다.
 */

"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";
import type { ErrorProps } from "@/types";

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  /**
   * 1. refresh 함수 호출
   *   - router 객체의 refresh 함수를 통해 Next 서버에게 현재 페이지에 로드된 서버 컴포넌트들을 새롭게 렌더링 요청
   *   - 때문에 AllBooks 컴포넌트와 RecommendBooks 컴포넌트가 다시 렌더링 되면서 API 응답을 새롭게 받을 수 있다.
   * 2. reset 함수 호출
   *   - 에러 컴포넌트의 reset 함수를 호출 해야 에러가 초기화 되어 해당 경로의 페이지 컴포넌트가 정상적으로 렌더링 된다.
   */
  const pageReset = () => {
    startTransition(() => {
      // 서버 컴포넌트 재렌더링 요청
      router.refresh();

      // 에러 상태 초기화
      reset();
    });
  };

  return (
    <div>
      <h3>오류가 발생했습니다. </h3>
      <div>message : {error.message}</div>
      <button onClick={pageReset}>Reset</button>
    </div>
  );
}
