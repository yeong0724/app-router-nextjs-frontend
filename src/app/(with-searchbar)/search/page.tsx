import BookItem from "@/components/book-item";
import { type BookData } from "@/types";

// export const dynamic = "error";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const DOMAIN = process.env.NEXT_PUBLIC_API_SERVER_URL;
  const { q } = await searchParams;

  const response = await fetch(`${DOMAIN}/book/search?q=${q}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
