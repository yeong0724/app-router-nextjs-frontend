/**
 * 클라이언트 컴포넌트로 설정해준뒤 useActionState Hook을 사용하여 클라이언트 측에서 서버 액션에 대한 UI/UX를 정의해준다.
 */
"use client";

import { useActionState, useEffect } from "react";
import style from "@/components/book/review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";
import type { ServerActionResponse } from "@/types";

type ReviewEditorProps = {
  bookId: string;
};

export default function ReviewEditor({ bookId }: ReviewEditorProps) {
  const [state, formAction, isPending] = useActionState<
    ServerActionResponse<any>,
    FormData
  >(createReviewAction, {
    error: false,
    message: "",
    response: "",
  });

  useEffect(() => {
    if (state && state.error) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={style.submit_container}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
          />
          <button type="submit" disabled={isPending}>
            {isPending ? "등록중..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
