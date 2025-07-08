"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, useState } from "react";

/**
 *
 * [Client Component] 특징과 주의사항
 * - 상호작용이 있다면 client-component 로 만들어줘야 한다.
 *   (순수 자바스크립트 상호작용만 해당, HTML 기능에 해당하는 <LINK />의 경우 제외 된다)
 * - Hook, Input, Click 과 같은 JS 상호작용이 있는 컴포넌트는 클라이언트 컴포넌트로 생성
 * - 클라이언트 컴포넌트는 Server와 브라우저측 각각 한번씩 동일하게 실행되게 된다.
 * - client component에 server component를 import 해서는 안된다
 *   (클라이언트 컴포넌트 입장에서 서버 컴포넌트는 없는 코드)
 */
export default function Searchbar() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <input value={search} onChange={onChangeSearch} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
