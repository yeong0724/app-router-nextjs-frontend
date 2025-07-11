import { createReviewAction } from "@/actions/create-review.action";
import { notFound } from "next/navigation";
import style from "@/app/book/[id]/page.module.css";

/**
 * [Full Route Cache 동적 경로에 적용하기]
 * - Next Server가 해당 페이지를 생성할때 이 dynamicParams라는 변수의 값을 확인해서
 *   false이면 해당 페이지의 URL 파라미터를 더이상 다이나믹하게 읽지 않게 된다.
 *   (generateStaticParams 이외의 파라미터에 대해서는 404 에러가 발생할 것)
 * - 사용하지 않는 경우 주석처리(미작성) 하던지 true로 값을 할당하면 됨
 */
export const dynamicParams = true;

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      // 404 Page로 리다이렉션 처리
      notFound();
    }

    return <div>오류가 발생했습니다...</div>;
  }

  const book = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form action={createReviewAction} className={style["form-container"]}>
        <input name="bookId" value={bookId} hidden readOnly />
        <input required name="content" placeholder="리뷰 내용" />
        <input required name="author" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
    </div>
  );
}
