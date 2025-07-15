/**
 * [Server Action]
 * 1. 코드의 간결성
 * 2. 클라이언트 측에서 코드를 접근할 수 없기 때문에 보안성이 우수함
 */
"use server";

import type { FormServerAction } from "@/types";
import { revalidateTag } from "next/cache";

export const createReviewAction: FormServerAction = async (state, formData) => {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return {
      error: true,
      message: "리뷰 내용과 작성자를 입력해주세요",
      response: "",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );

    /**
     * 전달 받은 URL에 대한 페이지를 재검증하여 API를 다사 요청해서 새로 등록한 리뷰가 재조회 된다.
     * revalidatePath(page url)
     *  - 서버 컴포넌트 or 서버 액션 내에서만 호출이 가능하다.
     *  - 해당 URL 페이지에 존재하는 데이터 캐시들은 전부 무효화 된다. (Full Route Cache도 마찬가지)
     *
     * 2번째 파라미터 옵션
     * 1. revalidatePath(page url)
     *   - 주어진 경로의 페이지만 재검증
     *
     * 2. revalidatePath(page url, "page")
     *   - 주어진 경로의 모든 동작 페이지 검증
     *
     * 3. revalidatePath(page url, "layout")
     *   - 특정 레이아웃을 갖는 모든 페이지 재검증
     *
     * 4. revalidatePath("/", "layout")
     *   - 루트 경로의 레이아웃과 모든 하위 페이지를 재검증하는 매우 광범위한 재검증
     *
     * 5. revalidateTag(tagName_1)
     *   - 태그 값을 기준으로 데이터 캐시 재검증
     *   - fetch(API URL, { next: { tags: [tagName_1, tagName_2] } });
     *   - 특정 tag명의 API만 재검증이 가능한 방법으로 효율적이고 유용한 방법이다. (불필요한 컴포넌트 렌더링을 최소화)
     */
    revalidateTag(`review-${bookId}`);

    return {
      error: false,
      message: "리뷰 내용과 작성자를 입력해주세요",
      response: response.json(),
    };
  } catch (err) {
    return {
      response: err,
      error: true,
      message: `리뷰 저장에 실패했습니다 : ${err}`,
    };
  }
};
