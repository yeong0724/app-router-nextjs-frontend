import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import style from "@/app/book/[id]/page.module.css";
import ReviewItem from "@/components/book/review-item";
import ReviewEditor from "@/components/book/review-editor";
import type { BookData, ReviewData } from "@/types";

/**
 * [Full Route Cache 동적 경로에 적용하기]
 * - Next Server가 해당 페이지를 생성할때 이 dynamicParams라는 변수의 값을 확인해서
 *   false이면 해당 페이지의 URL 파라미터를 더이상 다이나믹하게 읽지 않게 된다.
 *   (generateStaticParams 이외의 파라미터에 대해서는 404 에러가 발생할 것)
 * - 사용하지 않는 경우 주석처리(미작성) 하던지 true로 값을 할당하면 됨
 */
export const dynamicParams = true;

/**
 * 반환하는 Params 배열에 따라 빌드시에 Route Cache 페이지를 생성한다.
 */
// export function generateStaticParams() {
//   return [{ id: "1" }, { id: "2" }, { id: "3" }];
// }

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
        <Image
          src={coverImgUrl}
          width={240}
          height={300}
          alt={`도서 ${title}의 표지 이미지`}
        />
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

async function ReviewList({ bookId }: { bookId: string }) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`;
  const response = await fetch(API_URL, {
    next: {
      tags: [`review-${bookId}`],
    },
  });

  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | null> {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const book: BookData = await response.json();

  return {
    title: `${book.title} - 한입북스`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} - 한입북스`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
