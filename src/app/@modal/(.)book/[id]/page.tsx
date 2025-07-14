import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal/modal";

/**
 * [Intercepting Route]
 * 1. (.)
 *  - to match segments on the same level
 *
 * 2. (..)
 *  - to match segments one level above
 *
 * 3. (..)(..)
 *  - to match segments two levels above
 *
 * 4. (...)
 *  - to match segments from the root app directory
 */
export default function Page(props: any) {
  return (
    <div>
      가로채기 성공!
      <Modal>
        <BookPage {...props} />
      </Modal>
    </div>
  );
}
