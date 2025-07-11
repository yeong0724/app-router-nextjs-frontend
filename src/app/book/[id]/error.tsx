"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import type { ErrorProps } from "@/types";

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  return (
    <div>
      <h3>오류가 발생했습니다</h3>
      <div>Message : {error.message}</div>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
