"use client";

import type { ErrorProps } from "@/types";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

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
      <h3>검색 도서를 불러오는 도중 오류가 발생했습니다. </h3>
      <div>message : {error.message}</div>
      <button onClick={pageReset}>Reset</button>
    </div>
  );
}
