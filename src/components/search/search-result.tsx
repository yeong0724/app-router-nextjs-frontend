import { BookData } from "@/types";
import BookItem from "@/components/book/book-item";

type SearchResultProps = {
  q: string;
};

export default async function SearchResult({ q }: SearchResultProps) {
  const DOMAIN = process.env.NEXT_PUBLIC_API_SERVER_URL;

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
