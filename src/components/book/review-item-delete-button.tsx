"use client";

import { deleteReviewAction } from "@/actions/delete-review.action";
import type { ServerActionResponse } from "@/types";
import { useActionState, useEffect, useRef } from "react";

type ReviewItemDeleteButtonProps = {
  reviewId: number;
  bookId: number;
};

export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: ReviewItemDeleteButtonProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState<
    ServerActionResponse<any>,
    FormData
  >(deleteReviewAction, {
    error: false,
    message: "",
    response: "",
  });

  useEffect(() => {
    if (state && state.error) {
      alert(state.message);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" value={reviewId} hidden readOnly />
      <input name="bookId" value={bookId} hidden readOnly />
      {isPending ? (
        <div>삭제중...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
      )}
    </form>
  );
}
