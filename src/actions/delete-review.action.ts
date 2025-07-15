"use server";

import { revalidateTag } from "next/cache";
import type { FormServerAction } from "@/types";

export const deleteReviewAction: FormServerAction = async (state, formData) => {
  const reviewId = formData.get("reviewId")?.toString();
  const bookId = formData.get("bookId")?.toString();

  if (!reviewId) {
    return {
      error: true,
      message: "삭제할 리뷰가 없습니다.",
      response: "",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag(`review-${bookId}`);

    return {
      error: false,
      message: "",
      response: response.json(),
    };
  } catch (err) {
    return {
      error: true,
      message: `리뷰 삭제에 실패했습니다 : ${err}`,
      response: err,
    };
  }
};
