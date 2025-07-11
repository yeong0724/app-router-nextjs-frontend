/**
 * [Server Action]
 * 1. 코드의 간결성
 * 2. 클라이언트 측에서 코드를 접근할 수 없기 때문에 보안성이 우수함
 */
"use server";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );
  } catch (err) {
    console.error(err);
    return;
  }
}
