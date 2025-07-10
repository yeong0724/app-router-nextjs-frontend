import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";

type BookListSkeletonProps = {
  count: number;
};

/**
 * React Loading Skeleton 라이브러리를 활용하면 보다 수월하게 스켈레톤 UI를 제공 할 수 있다.
 */
export default function BookListSkeleton({ count }: BookListSkeletonProps) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => <BookItemSkeleton key={`book-item-skeleton-${idx}`} />);
}
