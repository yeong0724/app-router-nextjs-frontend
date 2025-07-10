import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";

type BookListSkeletonProps = {
  count: number;
};

export default function BookListSkeleton({ count }: BookListSkeletonProps) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => <BookItemSkeleton key={`book-item-skeleton-${idx}`} />);
}
